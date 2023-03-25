// import all the files in the current directory

import { FieldResolver } from 'nexus/dist/core'
import { Context } from '../../../context'
import jwt from 'jsonwebtoken';

export default function(): FieldResolver<"Query", "UserDevices" | "Device" | "Devices"> {
  return async (_parent, _args, context: Context) => {
    const cookie = context.request.cookies.Authorization?.split("Bearer ")[1];
    if (!cookie) throw new Error(`You are not logged in.`);

    const decoded = jwt.decode(cookie) as DecodedJwtBearerToken;
    if (!decoded) throw new Error(`You are not logged in.`);

    const publicKey = decoded.publicKey;
    if (!publicKey) throw new Error(`You are not logged in.`);

    if (jwt.verify(cookie, publicKey) === null) throw new Error(`You are not logged in. Validation Failed!`);

    const deviceId = decoded.deviceId;
    if (!deviceId) throw new Error(`You are not logged in.`);
    
    const userId = decoded.id;
    if (!userId) throw new Error(`You are not logged in.`);

    const device = await context.prisma.device.findMany({
        where: {
            userId: userId,
        }
    });

    return device
  }
}