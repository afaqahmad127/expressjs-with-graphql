import { ObjectType, Field, ID, InputType } from 'type-graphql';

import { Designation } from './designation';
import { Salary } from './salaryTypes';

@ObjectType()
export class Users {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  Address: string;

  @Field(() => Designation)
  designation: Designation;

  @Field(() => String)
  email: string;

  @Field(() => [Salary], { nullable: true })
  salary: Salary[];
}

@ObjectType()
export class UserReturn {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  Address: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  designation: Designation;

  @Field(() => [Salary], { nullable: true })
  salary: Salary[];
}

@InputType()
export class registerUser {
  @Field()
  name: string;

  @Field()
  password: string;

  @Field()
  Address: string;

  @Field()
  email: string;

  @Field(() => ID)
  designation: Designation;
}

@InputType()
export class specificUser {
  @Field(() => ID)
  id: string;
}

@InputType()
export class loginUser {
  @Field(() => ID)
  email: string;

  @Field(() => String)
  password: string;
}

@InputType()
export class updateTheUser {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  Address: string;

  @Field(() => ID)
  designation: Designation;

  @Field(() => String)
  email: string;
}

@ObjectType()
export class token {
  @Field(() => ID)
  token: string;
}
