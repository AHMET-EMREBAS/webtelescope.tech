import { IBasicEntity, IID } from './base';

export interface IOrder<S, C> extends IBasicEntity {
  sku: S;
  quantity: number;
  cart: C;
}

export interface ICreateOrderDto
  extends Pick<IOrder<IID, IID>, 'cart' | 'quantity' | 'sku'> {}

export interface IUpdateOrderDto extends Partial<ICreateOrderDto> {}
