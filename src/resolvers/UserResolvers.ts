import {
  Resolver,
  Mutation,
  Arg,
  Query,
  UseMiddleware,
  Ctx,
} from 'type-graphql';
import { GraphQLError } from 'graphql';
import {
  registerUser,
  Users,
  specificUser,
  updateTheUser,
  UserReturn,
  loginUser,
  token,
} from '../graphql/userTypes';
import { UserService } from '../services/userService';
import { MyContext } from '../middleware/myContext';
import { authenticate } from '../middleware/auth';
@Resolver()
export class UsersResolvers {
  userService = new UserService();
  @Mutation(() => UserReturn)
  async registerUser(@Arg('input') input: registerUser) {
    try {
      return await this.userService.createUsers(input);
    } catch (error: any) {
      if (error.message.includes('designation'))
        throw new GraphQLError(error.message, {
          extensions: {
            code: 'Already exist ',
          },
        });
      if (error.message.includes('AlreadyExists')) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: 'BAD REQUEST ',
          },
        });
      }
      throw new GraphQLError(error.message, {
        extensions: {
          code: 'internal server error',
        },
      });
    }
  }

  @Mutation(() => token)
  async loginUser(@Arg('input') input: loginUser) {
    try {
      return await this.userService.loginUser(input);
    } catch (error: any) {
      if (error.message.includes('invalidCredentials')) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: 'Wrong email or password❎ ',
          },
        });
      } else {
        throw new GraphQLError(error.message, {
          extensions: {
            code: 'INTERNAL SERVER ERROR 📦',
          },
        });
      }
    }
  }

  @Mutation(() => UserReturn)
  @UseMiddleware(authenticate)
  async updateTheUser(
    @Arg('input') input: updateTheUser,
    @Ctx() { payload }: MyContext
  ) {
    try {
      return await this.userService.updateTheUser(input);
    } catch (error: any) {
      if (error.message.includes('notFound')) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: 'RESOURCE NOT FOUND',
          },
        });
      } else {
        throw new GraphQLError(error.message, {
          extensions: {
            code: 'INTERNAL SERVER ERROR 📦',
          },
        });
      }
    }
  }

  @Mutation(() => Users)
  @UseMiddleware(authenticate)
  async deletTheUser(
    @Arg('input') input: specificUser,
    @Ctx() { payload }: MyContext
  ) {
    try {
      return await this.userService.deleteTheUser(input);
    } catch (error: any) {
      if (error.message.includes('notFound')) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: 'RESOURCE NOT FOUND',
          },
        });
      } else {
        throw new GraphQLError(error.message, {
          extensions: {
            code: 'INTERNAL SERVER ERROR 📦',
          },
        });
      }
    }
  }

  @Query(() => Users)
  @UseMiddleware(authenticate)
  async getSingleUser(
    @Arg('input') input: specificUser,
    @Ctx() { payload }: MyContext
  ) {
    try {
      return await this.userService.getSingleUser(input);
    } catch (error: any) {
      if (error.message.includes('notFound')) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: 'RESOURCE NOT FOUND',
          },
        });
      } else {
        throw new GraphQLError(error.message, {
          extensions: {
            code: 'INTERNAL SERVER ERROR 📦',
          },
        });
      }
    }
  }

  @Query(() => [Users])
  @UseMiddleware(authenticate)
  async user(@Ctx() { payload }: MyContext) {
    try {
      return await this.userService.getAllUser();
    } catch (error: any) {
      throw new GraphQLError(error.message, {
        extensions: {
          code: 'INTERNAL SERVER ERROR 📦  ',
        },
      });
    }
  }
}
