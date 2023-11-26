import { BaseModel } from './base';

export interface StoreModel<PriceLevel> extends BaseModel {
  name: string;
  priceLevel: PriceLevel;
}
