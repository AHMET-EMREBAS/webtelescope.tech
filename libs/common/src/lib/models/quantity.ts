import { BaseModel } from './base';

export interface QuantityModel<Sku> extends BaseModel {
  quantity: number;
  sku: Sku;
}


