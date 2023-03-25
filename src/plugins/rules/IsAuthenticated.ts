import { decode, verify } from "jsonwebtoken";
import { rule } from "graphql-shield";
import { ShieldRule } from "graphql-shield/typings/types";

export const isAuthenticated:ShieldRule = rule({ cache: 'contextual' })(
    async (parent, args, ctx, info) => {
      const authHeader = ctx.request.headers.authorization;
      if (!authHeader) {
        return false
      }

      const token = authHeader.split(' ')[1];
      if (!token) {
        return false
      }

      // get the publicKey from the token
      const decodedToken = decode(token) as DecodedJwtBearerToken;

      try {
        const { id, exp } = verify(token, decodedToken.publicKey) as {
          id: number;
          exp: number;
        };
        if (exp < Date.now() / 1000) {
          ctx.response.status(401);
          throw new Error('Token expired.');
        }
        ctx.userId = id;
        return true;
      } catch (err) {
        return false
      }
    },
  )