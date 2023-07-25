import { AppDataSource } from '../loaders/db';
import {
  Course,
  CreateCourse,
  updateCourse,
  specificCourse,
} from '../graphql/course';
import { Repository } from 'typeorm';
import { CourseEntity } from '../entities/courses';
import { errorCodes } from '../constant/responseCodes';
export class CourseService {
  courseRepository: Repository<CourseEntity>;
  constructor() {
    // Initializing repository

    this.courseRepository = AppDataSource.getRepository(CourseEntity);
  }
  createCourse = async (data: CreateCourse) => {
    try {
      const newCoursRecord = await this.courseRepository.save(data);
      return newCoursRecord;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  updateCourse = async (data: updateCourse) => {
    try {
      const courseExist = await this.courseRepository.findOne({
        where: { id: Number(data.id) },
        relations: {
          students: true,
        },
      });

      if (!courseExist)
        throw new Error(`${errorCodes.coursesNotFound} on this id ❌ `);

      const newCoursRecord = await this.courseRepository.save(data);
      return newCoursRecord;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  deleteCourse = async (data: specificCourse) => {
    const course = await this.courseRepository.findOne({
      where: { id: Number(data.id) },
      relations: {
        students: true,
      },
    });
    console.log(course);

    if (!course) throw new Error(`${errorCodes.coursesNotFound}`);

    const hello = await this.courseRepository.softRemove(course);
    console.log(hello);
    return course;
  };

  getAllSCourse = async () => {
    const students = this.courseRepository.find();
    if (!students) throw new Error(`${errorCodes.studentNotExist}`);
    return students;
  };

  getSingleCourse = async (data: specificCourse) => {
    try {
      const courseExist = await this.courseRepository.findOne({
        where: { id: Number(data.id) },
        relations: {
          students: true,
        },
      });

      if (!courseExist)
        throw new Error(`${errorCodes.coursesNotFound} on this id ❌ `);

      return courseExist;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };
}
