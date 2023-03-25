import { FieldResolver } from 'nexus';
import { Context } from '../../../context';
import jwt from 'jsonwebtoken';

export default function(): FieldResolver<"Mutation", "logoutUser"> {
    return async (_parent, args, context: Context) => {
        // get cookie from request and split to a key value pair
        const cookie = context.request.cookies.Authorization?.split('Bearer ')[1]
        if (!cookie)
          throw new Error(`You are not logged in.`)
        const decoded = jwt.decode(cookie) as DecodedJwtBearerToken
        if (!decoded)
          throw new Error(`You are not logged in. Decoded: ${decoded}`)
        // get claims from jwt decoded
        if (jwt.verify(cookie, decoded.publicKey) === null)
          throw new Error(`You are not logged in. Verification failed.`)

        const user = await context.prisma.user.findUnique({
          where: { id: decoded.id },
        })

        if (!user) throw new Error(`You are not logged in.`)
        context.response.clearCookie('Authorization')

        await context.prisma.device.findUnique({
          where: { id: decoded.deviceId },
        })

        await context.prisma.device.delete({
          where: {
            id: decoded.deviceId,
          },
        })
        // return the LogoutUser type
        return {
          id: user?.id,
        }
    }
};