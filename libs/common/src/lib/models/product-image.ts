import { BaseModel } from './base';

export interface ProductImageModel<Product> extends BaseModel {
  name: string;
  url: string;
  product: Product;
}
