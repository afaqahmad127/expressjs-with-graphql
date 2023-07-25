import { ObjectType, Field, ID, InputType } from 'type-graphql';
import { Users } from './userTypes';

@ObjectType()
export class Salary {
  @Field(() => ID)
  id: number;

  @Field(() => Number)
  amount: number;

  @Field(() => String)
  timePeriod: string;

  @Field(() => Users)
  user: Users;
}

@InputType()
export class SalaryInput {
  @Field(() => ID, { nullable: true })
  id: number;

  @Field(() => Number)
  amount: number;

  @Field(() => String)
  timePeriod: string;

  @Field(() => String)
  user: Users;
}

@ObjectType()
export class SalarySpecificReturn {
  @Field(() => ID, { nullable: true })
  id: number;

  @Field(() => Number)
  amount: number;

  @Field(() => String)
  timePeriod: string;

  @Field(() => String)
  user: Users;
}

@InputType()
export class specifiSalary {
  @Field(() => ID)
  id: string;
}

@InputType()
export class SpecificSalary {
  @Field(() => ID)
  id: string;
}
