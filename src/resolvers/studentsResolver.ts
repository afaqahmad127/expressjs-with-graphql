import {
  Student,
  CreateStudent,
  SpecificStudent,
  updateStudent,
} from '../graphql/studentTypes';
import { StudentService } from '../services/studentService';
import { GraphQLError } from 'graphql';
import {
  Resolver,
  Mutation,
  Arg,
  Query,
  UseMiddleware,
  Ctx,
} from 'type-graphql';

import { MyContext } from '../middleware/myContext';
import { authenticate } from '../middleware/auth';

@Resolver()
export class StudentResolver {
  StudentService = new StudentService();
  @Mutation(() => Student)
  @UseMiddleware(authenticate)
  async createStudents(
    @Arg('input') input: CreateStudent,
    @Ctx() { payload }: MyContext
  ) {
    try {
      return await this.StudentService.createStudent(input);
    } catch (error: any) {
      if (error.message.includes('coursesNotFound')) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: 'Resources not found',
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

  @Query(() => [Student])
  @UseMiddleware(authenticate)
  async getAllStudents(@Ctx() { payload }: MyContext) {
    try {
      return await this.StudentService.getAllStudents();
    } catch (error: any) {
      if (error.message.includes('studentNotExist')) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: 'RESOURCE NOT FOUND ❌   ',
          },
        });
      }
      throw new GraphQLError(error.message, {
        extensions: {
          code: 'INTERNAL SERVER ERROR !!!!',
        },
      });
    }
  }

  @Mutation(() => Student)
  @UseMiddleware(authenticate)
  async updateStudents(
    @Arg('input') input: updateStudent,
    @Ctx() { payload }: MyContext
  ) {
    try {
      return await this.StudentService.updateStudent(input);
    } catch (error: any) {
      if (error.message.includes('studentNotExist')) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: 'RESOURCE NOT FOUND ❌   ',
          },
        });
      }
      throw new GraphQLError(error.message, {
        extensions: {
          code: 'INTERNAL SERVER ERROR !!!!',
        },
      });
    }
  }

  @Query(() => Student)
  @UseMiddleware(authenticate)
  async getSingleStudent(
    @Arg('input') input: SpecificStudent,
    @Ctx() { payload }: MyContext
  ) {
    try {
      return await this.StudentService.singleStudent(input);
    } catch (error: any) {
      if (error.message.includes('studentNotExist')) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: 'RESOURCE NOT FOUND ❌   ',
          },
        });
      }
      throw new GraphQLError(error.message, {
        extensions: {
          code: 'INTERNAL SERVER ERROR !!!!',
        },
      });
    }
  }

  @Mutation(() => Student)
  @UseMiddleware(authenticate)
  async deleteStudent(
    @Arg('input') input: SpecificStudent,
    @Ctx() { payload }: MyContext
  ) {
    try {
      return await this.StudentService.deleteStudent(input);
    } catch (error: any) {
      if (error.message.includes('studentNotExist')) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: 'RESOURCE NOT FOUND ❌   ',
          },
        });
      }
      throw new GraphQLError(error.message, {
        extensions: {
          code: 'INTERNAL SERVER ERROR !!!!',
        },
      });
    }
  }
}
