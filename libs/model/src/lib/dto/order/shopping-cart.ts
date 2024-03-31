import { IID } from '../../common';
import { IShoppingCart } from '../../model';

export interface ICreateShoppingCart
  extends Pick<IShoppingCart<IID>, 'customer'> {}
