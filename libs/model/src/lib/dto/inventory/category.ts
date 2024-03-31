import { ICategory } from '../../model';

export interface ICreateCategoryDto extends Pick<ICategory, 'category'> {}
