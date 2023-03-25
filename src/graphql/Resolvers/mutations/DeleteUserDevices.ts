import { FieldResolver } from 'nexus'
import { Context } from '../../../context'
import jwt from 'jsonwebtoken'

export default function (): FieldResolver<"Mutation", "deleteUserDevices"> {
  return async (_parent, args, context: Context) => {
    const cookie = context.request.cookies.Authorization?.split('Bearer ')[1]
    if (!cookie) throw new Error(`You are not logged in. Cookie: ${cookie}`)

    const decoded = jwt.decode(cookie) as DecodedJwtBearerToken
    if (!decoded) throw new Error(`You are not logged in. Decoded: ${decoded}`)

    if (jwt.verify(cookie, decoded.publicKey) === null)
      throw new Error(`You are not logged in. Verification failed.`)

    let deviceId = 'deviceId' in args ? args.deviceId : null
    let deviceIds = 'deviceIds' in args ? args.deviceIds : null

    let parsedDeviceId: number

    if (deviceId === null && deviceIds === null)
      throw new Error(`You must provide a deviceId or deviceIds.`)

    if (deviceId !== null && deviceIds !== null)
      throw new Error(`You must provide a deviceId or deviceIds, not both.`)

    if (deviceId !== null) {
      
      // find device where userId and deviceId match
      const device = await context.prisma.device.findUnique({
        where: {
          id: deviceId,
        },
      })

      if (!device) throw new Error(`No device found with id ${deviceId}.`)

      if (decoded.id !== device.userId)
        throw new Error(`You are not logged in with the user associated with this device.`)

      await context.prisma.device.delete({
        where: {
          id: deviceId,
        },
      })
      // unset authorization cookie
      if (decoded.deviceId === deviceId) context.response.clearCookie('Authorization')
      return {
        deletedIds: [device?.id],
      }
    }

    if (deviceIds) {
      if (deviceIds?.length === 0) throw new Error(`deviceIds must be an array of numbers.`)
      const deletedIds: number[] = []
      const notDeletedIds: number[] = []
      const errors: string[] = []
      await Promise.all(
        deviceIds.map(async (id) => {
          if (id === null) throw new Error(`deviceIds must be an array of numbers.`)
          const foundDevice = await context.prisma.device.findUnique({
            where: {
              id: id,
            },
          })
          if (foundDevice) {
            if (decoded.id !== foundDevice.userId) throw new Error(`You are not logged in with the user associated with this device. ${id}`)
            const deleted = await context.prisma.device.delete({
              where: {
                id: id,
              },
            })
            deletedIds.push(deleted.id)
          } else {
            notDeletedIds.push(id)
          }
        }),
      )
      if (notDeletedIds.length > 0) throw new Error(`No devices found. ${notDeletedIds.join(', ')}`)
      return {
        deletedIds: deletedIds,
      }
    }
    

    throw new Error(`You must provide a deviceId or deviceIds.`)
  }
}
