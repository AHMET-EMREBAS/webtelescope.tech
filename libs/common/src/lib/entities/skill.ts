import { IBaseEntity } from './base';
import { ICategory } from './category';

export interface ISkill extends IBaseEntity {
  name: string;
  category: ICategory;
}
