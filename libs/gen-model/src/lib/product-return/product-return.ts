import { IID } from '@webpackages/common';
export interface IProductReturn<TOrder, TUser> {
  description: string;
  quantity: number;
  order: TOrder;
  employee: TUser;
}
