import { AppDataSource } from '../loaders/db';
import { CreateDesignationInput } from '../graphql/designation';
import { Repository } from 'typeorm';
import { Designation } from '../entities/designation';
import { SpecificDesign, UpdateDesign } from '../graphql/designation';
import { User } from '../entities/user';
import { errorCodes } from '../constant/responseCodes';

export class designService {
  designationRepository: Repository<Designation>;
  userRepository: Repository<User>;
  constructor() {
    // Initializing repository

    this.designationRepository = AppDataSource.getRepository(Designation);
  }
  createdesign = async (data: CreateDesignationInput) => {
    try {
      const designation = new Designation();
      designation.name = data.name;
      const foundDesignation = await this.designationRepository.findOne({
        where: { name: data.name },
      });

      if (!foundDesignation) {
        const design = await this.designationRepository.save(designation);
        return design;
      }
      throw new Error(
        `${foundDesignation?.name} ${errorCodes.designationAlreadyExists}`
      );
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  getSingleUser = async (data: SpecificDesign) => {
    try {
      const result = await this.designationRepository.findOne({
        where: { id: Number(data.id) },
      });
      if (!result)
        throw new Error(`${errorCodes.designationNotFound} on this id`);
      return result;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  getAllDesign = async () => {
    try {
      const result = await this.designationRepository.find({
        relations: {},
      });
      if (!result) throw new Error(`${errorCodes.noDesignation}`);
      result;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  deleteTheDesign = async (data: SpecificDesign) => {
    try {
      const deleteData = await this.designationRepository.findOneBy({
        id: Number(data.id),
      });
      if (deleteData) {
        await this.designationRepository.delete(Number(data.id));
        return deleteData;
      }

      throw new Error(`${errorCodes.designationNotFound} on this id `);
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  updateTheDesign = async (data: UpdateDesign) => {
    try {
      const design = await this.designationRepository.findOne({
        where: { id: Number(data.id) },
      });

      if (!design)
        throw new Error(`${errorCodes.designationNotFound} on this id ❌ `);

      design.name = data.name;

      await this.designationRepository.save(design);

      return design;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };
}
