import { AppDataSource } from '../loaders/db';
import { CreateStudent } from '../graphql/studentTypes';
import { Repository } from 'typeorm';
import { StudentEntity } from '../entities/students';
import { errorCodes } from '../constant/responseCodes';
import { CourseEntity } from '../entities/courses';
import { SpecificStudent, updateStudent } from '../graphql/studentTypes';
export class StudentService {
  studentRepository: Repository<StudentEntity>;
  courseRepository: Repository<CourseEntity>;
  constructor() {
    // Initializing repository

    this.studentRepository = AppDataSource.getRepository(StudentEntity);

    this.courseRepository = AppDataSource.getRepository(CourseEntity);
  }
  createStudent = async (data: CreateStudent) => {
    try {
      const course = await Promise.all(
        data.courses.map(async (c) => {
          let course = await this.courseRepository.findOne({
            where: { id: Number(c) },
          });
          return course as CourseEntity;
        })
      );

      if (course.length < 1) {
        throw new Error(`${errorCodes.coursesNotFound}`);
      }
      const newStudent = new StudentEntity();
      newStudent.name = data.name;
      newStudent.fatherName = data.fatherName;
      newStudent.courses = course;

      const createdStudent = await this.studentRepository.save(newStudent);
      return createdStudent;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  singleStudent = async (data: SpecificStudent) => {
    try {
      const student = await this.studentRepository.findOne({
        where: { id: Number(data.id) },
        relations: {
          courses: true,
        },
      });

      if (!student)
        throw new Error(`${errorCodes.studentNotExist} on this id ❌ `);

      return student;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  updateStudent = async (data: updateStudent) => {
    try {
      const studentExist = await this.studentRepository.findOne({
        where: { id: Number(data.id) },
        relations: {
          courses: true,
        },
      });

      if (!studentExist)
        throw new Error(`${errorCodes.studentNotExist} on this id ❌ `);

      const student = new StudentEntity();

      student.name = data.name ?? studentExist.name;
      student.fatherName = data.fatherName ?? studentExist.fatherName;

      const course = await Promise.all(
        data.courses.map(async (c) => {
          let course = await this.courseRepository.findOne({
            where: { id: Number(c) },
          });
          return course as CourseEntity;
        })
      );
      studentExist.courses = course;

      await this.studentRepository.save(studentExist);

      const updatedStudent = await this.studentRepository.findOne({
        where: { id: Number(data.id) },
        relations: {
          courses: true,
        },
      });

      return updatedStudent;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  getAllStudents = async () => {
    const students = await this.studentRepository.find({
      relations: {
        courses: true,
      },
    });
    if (!students) throw new Error(`${errorCodes.studentNotExist}`);
    return students;
  };

  deleteStudent = async (data: SpecificStudent) => {
    const students = await this.studentRepository.findOne({
      where: { id: Number(data.id) },
      relations: {
        courses: true,
      },
    });

    if (!students) throw new Error(`${errorCodes.studentNotExist}`);

    await this.studentRepository.softDelete(Number(data.id));
    return students;
  };
}
