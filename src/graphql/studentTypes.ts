import { ObjectType, Field, ID, InputType } from 'type-graphql';
import { Course } from './course';

@ObjectType()
export class Student {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  fatherName: string;

  @Field(() => [Course], { nullable: true })
  courses: Course[];
}

@InputType()
export class CreateStudent {
  @Field(() => String)
  name: string;

  @Field(() => String)
  fatherName: string;

  @Field(() => [String])
  courses: Course[];
}

@InputType()
export class updateStudent {
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  fatherName: string;

  @Field(() => [String], { nullable: true })
  courses: Course[];
}

@InputType()
export class SpecificStudent {
  @Field(() => ID)
  id: string;
}
