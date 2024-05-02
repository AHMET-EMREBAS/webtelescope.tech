import { IID } from '@webpackages/gen-model';
export interface IUpdateProductDto {
  name?: string;
  description?: string;
  category?: IID[];
  department?: IID;
}
