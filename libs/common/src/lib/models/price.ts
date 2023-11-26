import { BaseModel } from './base';

export interface PriceModel<PriceLevel> extends BaseModel {
  price: number;
  cost: number;
  priceLevel: PriceLevel;
}


