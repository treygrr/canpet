import bcrypt from 'bcrypt'
import md5 from 'md5'
import { FieldResolver } from 'nexus'

import { Context } from '../../../context'

export default function (): FieldResolver<'Mutation', 'createUser'> {
  return async (_parent, args, context: Context) => {
    // check for unique email and username
    const email = await context.prisma.user.findUnique({
      where: { email: args.email },
    })
    const username = await context.prisma.user.findUnique({
      where: { username: args.username },
    })
    const usernameLowercase = await context.prisma.user.findUnique({
      where: { username: args.username.toLowerCase() },
    })
    if (email) {
      throw new Error('A user with that email is already registered.')
    }
    if (username || usernameLowercase) {
      throw new Error('A user with that username is already registered.')
    }
    const salt = bcrypt.genSaltSync(20)

    return context.prisma.user.create({
      data: {
        username: args.username,
        email: args.email,
        firstName: args.firstName,
        lastName: args.lastName,
        password: md5(salt + args.password),
        salt: salt,
      },
    })
  }
}
