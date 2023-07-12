import { ObjectType, Field, ID, InputType } from 'type-graphql';
import { Users } from './userTypes';
@ObjectType()
export class Designation {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => [Users], { nullable: true })
  users: Users[];
}

@InputType()
export class CreateDesignationInput {
  @Field()
  name: string;
}

@InputType()
export class UsersInput {
  @Field()
  name: string;

  @Field()
  password: string;

  @Field()
  Address: string;
}

@InputType()
export class SpecificDesign {
  @Field(() => ID)
  id: string;
}

@InputType()
export class UpdateDesign {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;
}
