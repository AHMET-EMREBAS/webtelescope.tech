import { IBaseEntity } from './base';
import { ISku } from './sku';

export interface IOrder extends IBaseEntity {
  sku: ISku;
  quantity: number;
}
