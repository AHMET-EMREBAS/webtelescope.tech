import { IBaseEntity } from './base';
import { ICart } from './cart';

export interface IPayment extends IBaseEntity {
  cart: ICart;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paid: boolean;
}
