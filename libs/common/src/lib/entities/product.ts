import { IBaseEntity } from './base';
import { ICategory } from './category';
import { IDepartment } from './department';

export interface IProduct extends IBaseEntity {
  name: string;
  description: string;
  category: ICategory;
  department: IDepartment;
  upc: string;
}
