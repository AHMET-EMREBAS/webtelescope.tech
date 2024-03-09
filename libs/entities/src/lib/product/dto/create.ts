import { Dto, Property } from '@webpackages/core';

@Dto()
export class CreateProductDto {
  @Property()
  name!: string;
}
