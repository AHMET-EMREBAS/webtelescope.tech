import { IBasicEntity, IID } from './base';

export interface IPayment<C, E> extends IBasicEntity {
  cart: C;
  customer: E;
  discount: number;
  paid: boolean;
  subtotal: number;
  tax: number;
  total: number;
}

export interface ICreatePaymentDto
  extends Pick<
    IPayment<IID, IID>,
    'cart' | 'customer' | 'discount' | 'subtotal' | 'paid' | 'tax' | 'total'
  > {}

export interface IUpdatePaymentDto extends Partial<ICreatePaymentDto> {}
