import { Dto, Property, IDDto } from '@webpackages/core';
import { ICreateSaleDto } from '@webpackages/gen-model';
@Dto()
export class CreateSaleDto implements ICreateSaleDto {
  @Property({
    type: 'number',
    required: true,
    minimum: 0,
    icon: 'currency',
    inputType: 'currency',
  })
  total!: number;
  @Property({
    type: 'number',
    required: true,
    minimum: 0,
    icon: 'currency',
    inputType: 'currency',
  })
  subtotal!: number;
  @Property({
    type: 'number',
    required: true,
    minimum: 0,
    icon: 'currency',
    inputType: 'currency',
  })
  tax!: number;
  @Property({ type: 'number', minimum: 0 }) discount?: number;
  @Property({ type: 'object', objectType: IDDto, required: true }) cart!: IDDto;
  @Property({ type: 'object', objectType: IDDto, required: true })
  customer!: IDDto;
}
