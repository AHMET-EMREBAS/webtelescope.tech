import { IID } from '@webpackages/common';
export interface IUpdateProductReturnDto {
  description?: string;
  quantity?: number;
  order?: IID;
  user?: IID;
}
