import { Dto, Property, IDDto } from '@webpackages/core';
import { IUpdateOrderDto } from '@webpackages/gen-model';
@Dto()
export class UpdateOrderDto implements IUpdateOrderDto {
  @Property({ type: 'number', minimum: 0, icon: 'quantity' }) quantity?: number;
  @Property({
    type: 'number',
    minimum: 0,
    icon: 'discount',
    inputType: 'currency',
  })
  discount?: number;
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
  subTotal?: number;
  @Property({
    type: 'number',
    minimum: 0,
    icon: 'currency',
    inputType: 'currency',
  })
  tax?: number;
  /**
   * Order description or notes
   */
  @Property({
    type: 'string',
    description: 'Order description or notes',
    maxLength: 1000,
    inputType: 'textarea',
  })
  description?: string;
  @Property({ type: 'object', objectType: IDDto }) sku?: IDDto;
  @Property({ type: 'object', objectType: IDDto }) cart?: IDDto;
}
