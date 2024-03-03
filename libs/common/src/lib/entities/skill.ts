import { IBasicEntity } from './base';
import { ICategory } from './category';

export interface ISkill extends IBasicEntity {
  name: string;
  category: ICategory;
}
