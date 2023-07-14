import { ObjectType, Field, ID, InputType } from 'type-graphql';

import { Student } from './studentTypes';

@ObjectType()
export class Course {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => [Student], { nullable: true })
  Students: Student[];
}

@InputType()
export class CreateCourse {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;
}

@InputType()
export class updateCourse {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;
}

@InputType()
export class specificCourse {
  @Field(() => ID)
  id: number;
}
