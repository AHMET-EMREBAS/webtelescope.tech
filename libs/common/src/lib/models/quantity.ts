import { BaseModel } from './base';

export interface QuantityModel<Product> extends BaseModel {
  quantity: number;
  product: Product;
}


