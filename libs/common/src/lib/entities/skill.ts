import { IBasicEntity } from './base';
import { ICategory } from './category';

export interface ISkill extends IBasicEntity {
  name: string;
  category: ICategory;
}

export interface ICreateSkillDto extends Pick<ISkill, 'name' | 'category'> {}

export interface IUpdateSkillDto extends Partial<ICreateSkillDto> {}


