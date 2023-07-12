import jwt from 'jsonwebtoken';
import { MiddlewareFn } from 'type-graphql';
import { dbConfig } from '../config/Config';
import { MyContext } from './myContext';
import { GraphQLError } from 'graphql';

export const authenticate: MiddlewareFn<MyContext> = async (
  { context },
  next
) => {
  const authToken = context.req.headers.authorization;
  if (!authToken) {
    throw new GraphQLError('please  provide the jwt token.. 📢  ');
  }

  try {
    const payload = jwt.verify(authToken, dbConfig.tokenKey);
    context.payload = payload as any;
  } catch (err: any) {
    throw new GraphQLError(err.message, {
      extensions: {
        code: 'NOT Authenticated ❌ ',
      },
    });
  }
  return next();
};
