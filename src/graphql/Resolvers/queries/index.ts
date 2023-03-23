import { objectType } from 'nexus';
import Users from './Users'

export const Query = objectType({
    name: "Query",
    definition(t) {
      t.list.field('Users', {
        type: "User",
        resolve: Users(),
      });
    },
  });