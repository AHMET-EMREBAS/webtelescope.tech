import { IBasicEntity } from './base';

export interface ICategory extends IBasicEntity {
  name: string;
}

export interface ICreateCategoryDto extends Pick<ICategory, 'name'> {}

export interface IUpdateCategoryDto extends Partial<ICreateCategoryDto> {}
