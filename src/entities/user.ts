import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Unique,
} from 'typeorm';
import { Designation } from './designation';
import { SalaryEntity } from './salary';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  Address: string;

  @ManyToOne(() => Designation, (designation) => designation.users, {})
  designation: Designation;

  @OneToMany(() => SalaryEntity, (salary) => salary.user, {
    onDelete: 'CASCADE',
  })
  salary: SalaryEntity[];
}
