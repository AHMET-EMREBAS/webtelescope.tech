import { Dto, Property } from '@webpackages/core';
import { IQueryOrderDto } from '@webpackages/common';
@Dto()
export class QueryOrderDto implements IQueryOrderDto {
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
   */ @Property({
    type: 'string',
    description: 'Order description or notes',
    maxLength: 1000,
    inputType: 'textarea',
  })
  description?: string;
  @Property({ type: 'string' }) skuBarcode?: string;
  @Property({ type: 'string' }) skuSku?: string;
  @Property({ type: 'string' }) skuName?: string;
  @Property({ type: 'string' }) skuDescription?: string;
  @Property({ type: 'string' }) cartDescription?: string;
  @Property({ type: 'string' }) cartChecked?: boolean;
}
