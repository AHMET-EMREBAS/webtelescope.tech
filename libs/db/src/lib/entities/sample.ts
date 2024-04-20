import {
  ICreateSampleDto,
  IQuerySampleDto,
  ISample,
} from '@webpackages/common';

import {
  Entity,
  Column,
  IDEntity,
  Dto,
  Property,
  QueryProperty,
} from '@webpackages/core';
import { PickType } from '@nestjs/swagger';

@Entity()
export class Sample extends IDEntity implements ISample {
  @Column({ type: 'string', unique: true }) name!: string;
}

@Dto()
export class CreateSampleDto implements ICreateSampleDto {
  @Property({ type: 'string', minLength: 3, maxLength: 30 })
  name!: string;
}

@Dto()
export class UpdateSampleDto extends PickType(CreateSampleDto, ['name']) {}



@Dto()
export class QuerySampleDto implements IQuerySampleDto {
  @Property({ type: 'string' })
  @QueryProperty()
  name?: string;
}
