// import all the files in the current directory

import { FieldResolver } from 'nexus/dist/core'
import { Context } from '../../../context'

// export field resolver for query type User
export default function(): FieldResolver<"Query", "User" | "Users"> {
  return async (_parent, _args, context: Context) => {
    const user = await context.prisma.user.findMany()

    return user
  }
}