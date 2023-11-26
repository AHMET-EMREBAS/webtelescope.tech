import { BaseModel } from './base';

export interface QuantityModel<Sku, Store> extends BaseModel {
  quantity: number;
  sku: Sku;
  store: Store;
}
