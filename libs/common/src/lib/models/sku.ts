import { BaseModel } from './base';

export interface SkuModel<Product> extends BaseModel {
  name: string;
  barcode: string;
  product: Product;
}
