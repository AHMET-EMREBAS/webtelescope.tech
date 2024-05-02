import { IID } from '@webpackages/common';
export interface IProductReturn<TOrder = IID, TUser = IID> extends IID {
  description: string;
  quantity: number;
  order: TOrder;
  user: TUser;
}
