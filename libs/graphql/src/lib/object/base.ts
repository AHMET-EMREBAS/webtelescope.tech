import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export class BaseObject {
  @Field(() => Int) id!: number;
  @Field(() => Date) createdAt!: number;
  @Field(() => Date) updatedAt!: number;
  @Field(() => Date) deletedAt!: number;
  @Field(() => Boolean) active!: boolean;
}
