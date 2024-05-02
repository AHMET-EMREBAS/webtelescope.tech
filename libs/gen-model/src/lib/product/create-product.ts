import { IID } from '@webpackages/gen-model';
export interface ICreateProductDto {
  name: string;
  description?: string;
  category?: IID[];
  department?: IID;
}
