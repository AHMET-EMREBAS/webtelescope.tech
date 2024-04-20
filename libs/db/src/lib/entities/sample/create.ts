import { ICreateSampleDto } from '@webpackages/common';
import { Dto, Property } from '@webpackages/core';

@Dto()
export class CreateSampleDto implements ICreateSampleDto {
  @Property({ type: 'string', minLength: 3, maxLength: 30 })
  name!: string;
}
