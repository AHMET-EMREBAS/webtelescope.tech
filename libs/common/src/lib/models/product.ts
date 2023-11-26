import { BaseModel } from './base';

export interface ProductModel<Category> extends BaseModel {
  name: string;
  description: string;
  upc: string;
  category: Category;
}
