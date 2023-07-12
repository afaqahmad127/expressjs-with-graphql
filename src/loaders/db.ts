import { dbConfig } from '../config/Config';
import { DataSource } from 'typeorm';
import { Designation } from '../entities/designation';
import { User } from '../entities/user';
import { SalaryEntity } from '../entities/salary';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: dbConfig.host,
  port: dbConfig.db_port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  synchronize: true,
  logging: 'all',
  entities: [User, Designation, SalaryEntity],
});
