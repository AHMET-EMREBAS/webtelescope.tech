import { IID, ITimestampEntity } from './base';

export interface IPayment<C, E> extends ITimestampEntity {
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
