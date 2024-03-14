import { ObjectType, Field } from '@nestjs/graphql';
import { BaseObject } from '../../object/base';

@ObjectType()
export class SampleObject extends BaseObject {
  @Field() name!: string;
}
