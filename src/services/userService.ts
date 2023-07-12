import { AppDataSource } from '../loaders/db';
import {
  registerUser,
  specificUser,
  updateTheUser,
  loginUser,
} from '../graphql/userTypes';
import { User } from '../entities/user';
import { Repository } from 'typeorm';
import { Designation } from '../entities/designation';
import { SalaryEntity } from '../entities/salary';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { dbConfig } from '../config/Config';
import { errorCodes } from '../constant/responseCodes';
export class UserService {
  userRepository: Repository<User>;
  designationRepository: Repository<Designation>;
  salaryRepository: Repository<SalaryEntity>;
  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
    this.designationRepository = AppDataSource.getRepository(Designation);
    this.salaryRepository = AppDataSource.getRepository(SalaryEntity);
  }

  createUsers = async (data: registerUser) => {
    try {
      //iniliazing our objects here
      const userAlreadyExist = await this.userRepository.findOne({
        where: { email: data.email },
      });
      if (!userAlreadyExist) {
        const alreadyExist = await this.designationRepository.findOne({
          where: { id: Number(data.designation) },
        });

        const name = alreadyExist?.name;
        if (name === 'Ceo' || name === 'HR-Manager' || name === 'director') {
          throw new Error(
            `${alreadyExist?.name} as designation already exists`
          );
        }

        const salt = await bcrypt.genSalt(6);
        const hashPassword = await bcrypt
          .hash(data.password, salt)
          .catch((error) => {
            throw new Error(error);
          });

        data.password = hashPassword;
        const createdUser = await this.userRepository.save(data);

        return createdUser;
      }

      throw new Error(`${errorCodes.userAlreadyExist} ☹  `);
    } catch (err: any) {
      throw new Error(err.message);
    }
  };
  getAllUser = async () => {
    try {
      return await this.userRepository.find();
    } catch (err: any) {
      throw new Error(`${errorCodes.notFound} `);
    }
  };

  getSingleUser = async (data: specificUser) => {
    try {
      const result = await this.userRepository.findOne({
        where: { id: Number(data.id) },
        relations: {
          designation: true,
        },
      });

      if (!result) throw new Error(`${errorCodes.notFound} ❌ `);

      return result;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  updateTheUser = async (data: updateTheUser) => {
    try {
      const user = await this.userRepository.findOne({
        where: { id: Number(data.id) },
      });

      if (!user) throw new Error(`${errorCodes.notFound} ❌ `);

      user.Address = data.Address;
      user.designation = data.designation;
      user.email = data.email;
      user.password = data.password;
      user.name = data.name;
      const updatedUser = await this.userRepository.save(user);
      return updatedUser;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  deleteTheUser = async (data: specificUser) => {
    try {
      const deleteData = await this.userRepository.findOne({
        where: { id: Number(data.id) },
        relations: {
          designation: true,
        },
      });

      if (deleteData) {
        await this.userRepository.delete(Number(data.id));
        return deleteData;
      }
      throw new Error(`${errorCodes.notFound} ❌ `);
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  loginUser = async (data: loginUser) => {
    try {
      const user = await this.userRepository.findOne({
        where: { email: data.email },
      });

      if (!user) throw new Error(`${errorCodes.invalidCredentials} ❌ `);

      const validPassword = await bcrypt
        .compare(data.password, user?.password)
        .then((result) => result)
        .catch((err) => {
          throw new Error(err);
        });

      if (!validPassword) {
        throw new Error(`${errorCodes.invalidCredentials} ❌ `);
      }

      interface tokenType {
        token: string;
      }

      let jwtString = '';
      jwtString = jwt.sign({ id: user.id }, dbConfig.tokenKey, {
        expiresIn: '1h',
      });
      const authToken: tokenType = {
        token: jwtString,
      };

      return authToken;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };
}
