import { IBaseEntity } from './base';
import { IPriceLevel } from './price-level';
import { ISku } from './sku';

export interface IPrice extends IBaseEntity {
  price: number;
  cost: number;
  sku: ISku;
  priceLevel: IPriceLevel;
}
