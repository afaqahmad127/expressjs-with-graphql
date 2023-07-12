import { Resolver, Mutation, Arg, Query, UseMiddleware } from 'type-graphql';
import 'reflect-metadata';
import { GraphQLError } from 'graphql';
import {
  Designation,
  CreateDesignationInput,
  SpecificDesign,
  UpdateDesign,
} from '../graphql/designation';
import { designService } from '../services/desigService';
import { authenticate } from '../middleware/auth';
@Resolver()
export class DesignResolvers {
  designService = new designService();
  @Mutation(() => Designation)
  @UseMiddleware(authenticate)
  async createdesign(@Arg('input') input: CreateDesignationInput) {
    try {
      return await this.designService.createdesign(input);
    } catch (error: any) {
      if (error.message.includes('designationAlreadyExists')) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: 'designation already exist ',
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

  @Mutation(() => Designation)
  @UseMiddleware(authenticate)
  async deletTheDesign(@Arg('input') input: SpecificDesign) {
    try {
      return await this.designService.deleteTheDesign(input);
    } catch (error: any) {
      if (error.message.includes('designationNotFound')) {
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

  @Mutation(() => Designation)
  @UseMiddleware(authenticate)
  async updateTheDesign(@Arg('input') input: UpdateDesign) {
    try {
      return await this.designService.updateTheDesign(input);
    } catch (error: any) {
      if (error.message.includes('designationNotFound')) {
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

  @Query(() => Designation)
  @UseMiddleware(authenticate)
  async getSingleDesign(@Arg('input') input: SpecificDesign) {
    try {
      return await this.designService.getSingleUser(input);
    } catch (error: any) {
      if (error.message.includes('designationNotFound')) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: 'RESOURCE NOT FOUND',
          },
        });
      }
      throw new GraphQLError(error.message, {
        extensions: {
          code: 'INTERNAL SERVER ERROR 📦',
        },
      });
    }
  }

  @Query(() => [Designation])
  @UseMiddleware(authenticate)
  async getAllDesign() {
    try {
      return await this.designService.getAllDesign();
    } catch (error: any) {
      if (error.message.includes('noDesignation'))
        throw new GraphQLError(error.message, {
          extensions: {
            code: 'cannot found any designation',
          },
        });
      throw new GraphQLError(error.message, {
        extensions: {
          code: 'INTERNAL SERVER ERROR',
        },
      });
    }
  }
}
