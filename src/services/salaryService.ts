import { AppDataSource } from '../loaders/db';
import { SalaryInput, specifiSalary } from '../graphql/salaryTypes';
import { Repository } from 'typeorm';
import { SalaryEntity } from '../entities/salary';
import { errorCodes } from '../constant/responseCodes';
export class SalaryService {
  salaryRepository: Repository<SalaryEntity>;
  constructor() {
    // Initializing repository

    this.salaryRepository = AppDataSource.getRepository(SalaryEntity);
  }
  createSalary = async (data: SalaryInput) => {
    try {
      const newSalaryRecord = await this.salaryRepository.save(data);
      return newSalaryRecord;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  updateSalary = async (data: SalaryInput) => {
    try {
      const newSalaryRecord = await this.salaryRepository.save(data);
      if (!newSalaryRecord) throw new Error(`${errorCodes.salaryNotFound}`);
      return newSalaryRecord;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  getSingleSalary = async (data: specifiSalary) => {
    try {
      const result = await this.salaryRepository.findOne({
        where: { id: Number(data.id) },
      });

      if (!result) throw new Error(`${errorCodes.salaryNotFound} ❌ `);

      return result;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  getAllSalary = async () => {
    try {
      return await this.salaryRepository.find({
        relations: {
          user: true,
        },
      });
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  deleteSalary = async (data: specifiSalary) => {
    try {
      const salaryRecord = await this.salaryRepository.findOne({
        where: { id: Number(data.id) },
      });
      if (salaryRecord) {
        await this.salaryRepository.delete(Number(data.id));

        return salaryRecord;
      }

      if (!salaryRecord) throw new Error(`${errorCodes.salaryNotFound} ❌ `);
    } catch (err: any) {
      throw new Error(err.message);
    }
  };
}
