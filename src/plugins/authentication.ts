
import { shield } from 'graphql-shield';
import { isAuthenticated } from './rules/IsAuthenticated';

export const Authentication = shield({
  Query: {
    UserDevices: isAuthenticated,
  },
  Mutation: {
    logoutUser: isAuthenticated,
  },
});
