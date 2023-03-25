import { intArg, list, nonNull, nullable, objectType, stringArg } from 'nexus'

import CreateUser from './CreateUser'
import LoginUser from './LoginUser'
import LogoutUser from './LogoutUser'
import DeleteUserDevices from './DeleteUserDevices'

export const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.field('loginUser', {
      type: 'LoginUser',
      args: {
        username: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: LoginUser(),
    }),
    t.field('logoutUser', {
      type: 'LogoutUser',
      resolve: LogoutUser(),
    }),
    t.field('createUser', {
      type: 'User',
      args: {
        username: nonNull(stringArg()),
        email: nonNull(stringArg()),
        firstName: nonNull(stringArg()),
        lastName: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: CreateUser(),
    }),
    t.field('deleteUserDevices', {
      type: 'DeletedUserDevices',
      args: {
        deviceId: nullable(intArg()),
        deviceIds: list(nullable(intArg())),
      },
      resolve: DeleteUserDevices(),
    })
  },
})
