import { BaseModel } from './base';

export interface PriceModel<PriceLevel, Sku> extends BaseModel {
  price: number;
  cost: number;
  priceLevel: PriceLevel;
  sku: Sku;
}
