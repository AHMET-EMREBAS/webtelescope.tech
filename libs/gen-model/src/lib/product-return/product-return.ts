import { IID } from '@webpackages/common';
export interface IProductReturn<TOrder = IID, TUser = IID> {
  description: string;
  quantity: number;
  order: TOrder;
  user: TUser;
}
