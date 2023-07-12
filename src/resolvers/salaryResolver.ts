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
  SalaryInput,
  Salary,
  SalarySpecificReturn,
  specifiSalary,
} from '../graphql/salaryTypes';
import { SalaryService } from '../services/salaryService';
import { authenticate } from '../middleware/auth';
import { MyContext } from '../middleware/myContext';

@Resolver()
export class salaryResolvers {
  salaryService = new SalaryService();
  @Mutation(() => SalarySpecificReturn)
  @UseMiddleware(authenticate)
  async createSalary(
    @Arg('input') input: SalaryInput,
    @Ctx() { payload }: MyContext
  ) {
    try {
      return await this.salaryService.createSalary(input);
    } catch (error: any) {
      throw new GraphQLError(error.message, {
        extensions: {
          code: 'INTERNAL SERVER ERROR 📦',
        },
      });
    }
  }

  @Mutation(() => SalarySpecificReturn)
  @UseMiddleware(authenticate)
  async updateSalary(
    @Arg('input') input: SalaryInput,
    @Ctx() { payload }: MyContext
  ) {
    try {
      return await this.salaryService.updateSalary(input);
    } catch (error: any) {
      if (error.message.includes('salaryNotFound')) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: 'RESOURCE NOT FOUND ❌ ',
          },
        });
      }
      throw new GraphQLError('internal server error', {
        extensions: {
          code: 'INTERNAL SERVER ERROR 📦',
        },
      });
    }
  }

  @Mutation(() => SalarySpecificReturn)
  @UseMiddleware(authenticate)
  async deleteSalary(
    @Arg('input') input: specifiSalary,
    @Ctx() { payload }: MyContext
  ) {
    try {
      return await this.salaryService.deleteSalary(input);
    } catch (error: any) {
      if (error.message.includes('salaryNotFound')) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: 'RESOURCE NOT FOUND ❌ ',
          },
        });
      }
      throw new GraphQLError('internal server error', {
        extensions: {
          code: 'INTERNAL SERVER ERROR 📦',
        },
      });
    }
  }

  @Query(() => Salary)
  @UseMiddleware(authenticate)
  async getSingleSalary(
    @Arg('input') input: specifiSalary,
    @Ctx() { payload }: MyContext
  ) {
    try {
      return await this.salaryService.getSingleSalary(input);
    } catch (error: any) {
      if (error.message.includes('salaryNotFound')) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: 'RESOURCE NOT FOUND',
          },
        });
      }
      throw new GraphQLError('internal server error', {
        extensions: {
          code: 'INTERNAL SERVER ERROR 📦',
        },
      });
    }
  }

  @Query(() => [Salary])
  @UseMiddleware(authenticate)
  async allSalary(
    @Arg('input') input: specifiSalary,
    @Ctx() { payload }: MyContext
  ) {
    try {
      return await this.salaryService.getAllSalary();
    } catch (error: any) {
      throw new GraphQLError(error.message, {
        extensions: {
          code: 'CANNOT FOUND ANY USERS ❌ ',
        },
      });
    }
  }
}
