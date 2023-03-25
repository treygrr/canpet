import { rule } from 'graphql-shield';
import { verify, decode } from 'jsonwebtoken';

export default async (parent, args, ctx, info) => {
    const authHeader = ctx.req.headers.authorization;
    if (!authHeader) {
      return new Error('Not authenticated.');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return new Error('Not authenticated.');
    }

    // get the publicKey from the token
    const decodedToken = decode(token) as DecodedJwtBearerToken;

    try {
      const { id, exp } = verify(token, decodedToken.publicKey) as {
        id: number;
        exp: number;
      };
      if (exp < Date.now() / 1000) {
        ctx.res.status(401);
        return new Error('Token expired.');
      }
      ctx.userId = { id };
      return true;
    } catch (err) {
      return new Error('Not authenticated.');
    }
  };
