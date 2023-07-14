import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { StudentEntity } from './students';

@Entity({ name: 'course' })
export class CourseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => StudentEntity, (student) => student.courses, {
    nullable: true,
    cascade: false,
    onDelete: 'SET NULL',
  })
  students: StudentEntity[];

  @DeleteDateColumn({ type: 'time without time zone', nullable: true })
  public deletedAt?: Date;

  @CreateDateColumn({ type: 'time without time zone', nullable: true })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'time without time zone', nullable: true })
  public updatedAt!: Date;
}
