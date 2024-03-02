import { IBaseEntity } from './base';
import { ICustomer } from './customer';
import { IOrder } from './order';

export interface ICart extends IBaseEntity {
  orders: IOrder[];
  customer: ICustomer;
}
