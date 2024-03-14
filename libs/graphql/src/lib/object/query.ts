import { ObjectType, Field, Int, OmitType } from '@nestjs/graphql';

@ObjectType()
export class QueryInput {
  @Field(() => Int) take?: number;
  @Field(() => Int) skip?: number;
  @Field(() => Boolean) withDeleted?: boolean;
  @Field(() => [String]) select?: string[];
}

@ObjectType()
export class IdInput {
  @Field(() => Int) id!: number;
}

@ObjectType()
export class AddRelationInput {
  @Field(() => Int) id!: number;
  @Field(() => Int) rid!: number;
  @Field() rn!: string;
}

@ObjectType()
export class RemoveRelationInput extends AddRelationInput {}

@ObjectType()
export class SetRelationInput extends AddRelationInput {}

@ObjectType()
export class UnsetRelationInput extends OmitType(AddRelationInput, ['rn']) {}
