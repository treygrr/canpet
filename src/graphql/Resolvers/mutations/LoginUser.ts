import { CookieOptions } from 'express';
import md5 from 'md5';
import { FieldResolver } from 'nexus/dist/core'
import { Context } from '../../../context'
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export default function(): FieldResolver<"Mutation", "loginUser"> {
    return async (_parent, args, context: Context) => {
      // get cookie from request and split to a key value pair
      const cookie = context.request.cookies.Authorization?.split("Bearer ")[1];
      if (cookie) throw new Error(`You are already logged in. ${cookie}}`);

      const user = await context.prisma.user.findUnique({
        where: { username: args.username }
      });

      if (!user) {
        throw new Error("User name and password combination is incorrect.");
      }

      const incomingPassword = md5(user?.salt+args.password)

      if (user?.password !== incomingPassword) {
        throw new Error("User name and password combination is incorrect.");
      }

      // generate a private and public key pair
      const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
        modulusLength: 2048,
        publicKeyEncoding: {
          type: "spki",
          format: "pem",
        },
        privateKeyEncoding: {
          type: "pkcs8",
          format: "pem",
        },
      });
      
      // user has been authenticated via password
      // generate the device for a user
      const device = await context.prisma.device.create({
        data: {
          User: {
            connect: {
              id: user?.id,
            }
          },
          privateKey: privateKey,
          publicKey: publicKey,
        }
      });

      // need to generate a jwt refresh token
      const refreshToken = jwt.sign({
        id: user.id,
        deviceId: device.id,
        publicKey: publicKey,
      }, privateKey, {
        expiresIn: "1y",
        algorithm: "RS256"
      });

      // need to generate a jwt auth token
      const authToken = jwt.sign({
        id: user.id,
        deviceId: device.id,
        publicKey: publicKey,
        tokenProvider: "password",
      }, privateKey, {
        expiresIn: "15m",
        algorithm: "RS256"
      });

      // set the auth token as a cookie with the refresh token
      const cookieOptions: CookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 15
      }
      context.response.cookie("Authorization", `Bearer ${refreshToken}`, cookieOptions);

      // need to get the ip address of the user
      const ipAddress = (context.request.headers['x-forwarded-for'] || context.request.connection.remoteAddress || context.request.socket.remoteAddress)?.toString();

      // need to get the user agent of the user
      const userAgent = context.request.headers['user-agent'];

      // store this as a new device for the user
      await context.prisma.device.update({
        where: {
          id: device.id
        },
        data: {
          ipAddress: ipAddress,
          userAgent: userAgent,
          refreshToken: refreshToken
        }
      });

      // return the UserLogin type
      return {
        id: user?.id,
        authToken: authToken,
      };
    }
};
