import { objectType } from 'nexus';

import Users from './Users'
import UserDevices from './UserDevices';

export const Query = objectType({
    name: "Query",
    definition(t) {
      t.list.field('Users', {
        type: "User",
        resolve: Users(),
      });
      t.list.field('UserDevices', {
        type: "UserDevice",
        resolve: UserDevices(),
      });
    },
  });