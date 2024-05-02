import { IID } from '@webpackages/common';
export interface ICreateProductReturnDto {
  description: string;
  quantity: number;
  order: IID;
  user: IID;
}
