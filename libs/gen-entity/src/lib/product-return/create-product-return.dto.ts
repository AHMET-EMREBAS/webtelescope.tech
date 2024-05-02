import { Dto, Property } from '@webpackages/core';
import { ICreateProductReturnDto } from '@webpackages/common';
@Dto()
export class CreateProductReturnDto implements ICreateProductReturnDto {
  @Property({
    type: 'string',
    required: true,
    maxLength: 1000,
    inputType: 'textarea',
  })
  description!: string;
  @Property({ type: 'number', required: true, minimum: 0 }) quantity!: number;
  @Property({ type: 'object', objectType: IDDto, required: true })
  order!: IDDto;
  @Property({ type: 'object', objectType: IDDto, required: true })
  employee!: IDDto;
}
