import { IID } from '../../common';
import { IOrder } from '../../model';

export interface ICreateOrderDto
  extends Pick<IOrder<IID, IID>, 'quantity' | 'sku' | 'shoppingCart'> {}
