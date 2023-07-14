import { AppDataSource } from '../loaders/db';
import {
  Course,
  CreateCourse,
  updateCourse,
  specificCourse,
} from '../graphql/course';
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
import { CourseService } from '../services/courseService';
export class courseResolver {
  CourseService = new CourseService();
  @Mutation(() => Course)
  @UseMiddleware(authenticate)
  async createCourse(
    @Arg('input') input: CreateCourse,
    @Ctx() { payload }: MyContext
  ) {
    try {
      return await this.CourseService.createCourse(input);
    } catch (error: any) {
      throw new GraphQLError(error.message, {
        extensions: {
          code: 'internal server error',
        },
      });
    }
  }

  @Mutation(() => Course)
  @UseMiddleware(authenticate)
  async updateCourse(
    @Arg('input') input: updateCourse,
    @Ctx() { payload }: MyContext
  ) {
    try {
      return await this.CourseService.updateCourse(input);
    } catch (error: any) {
      if (error.message.includes('coursesNotFound')) {
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

  @Mutation(() => Course)
  @UseMiddleware(authenticate)
  async deleteCourse(
    @Arg('input') input: specificCourse,
    @Ctx() { payload }: MyContext
  ) {
    try {
      return await this.CourseService.deleteCourse(input);
    } catch (error: any) {
      if (error.message.includes('coursesNotFound')) {
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

  @Query(() => [Course])
  @UseMiddleware(authenticate)
  async getAllCourses(@Ctx() { payload }: MyContext) {
    try {
      return await this.CourseService.getAllSCourse();
    } catch (error: any) {
      if (error.message.includes('coursesNotFound')) {
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

  @Query(() => Course)
  @UseMiddleware(authenticate)
  async singleCourse(
    @Arg('input') input: specificCourse,
    @Ctx() { payload }: MyContext
  ) {
    try {
      return await this.CourseService.getSingleCourse(input);
    } catch (error: any) {
      if (error.message.includes('coursesNotFound')) {
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
