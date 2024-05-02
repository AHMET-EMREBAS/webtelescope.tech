import { Dto, Property } from '@webpackages/core';
import { IUpdateSaleDto } from '@webpackages/common';
@Dto()
export class UpdateSaleDto implements IUpdateSaleDto {
  @Property({
    type: 'number',
    minimum: 0,
    icon: 'currency',
    inputType: 'currency',
  })
  total?: number;
  @Property({
    type: 'number',
    minimum: 0,
    icon: 'currency',
    inputType: 'currency',
  })
  subtotal?: number;
  @Property({
    type: 'number',
    minimum: 0,
    icon: 'currency',
    inputType: 'currency',
  })
  tax?: number;
  @Property({ type: 'number', minimum: 0 }) discount?: number;
  @Property({ type: 'object', objectType: IDDto }) cart?: IDDto;
  @Property({ type: 'object', objectType: IDDto }) customer?: IDDto;
}
