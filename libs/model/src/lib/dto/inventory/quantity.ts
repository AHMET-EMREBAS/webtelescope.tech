import { IID } from '../../common';
import { IQuantity } from '../../model';

export interface ICreateQuantityDto
  extends Pick<IQuantity<IID, IID>, 'quantity' | 'sku' | 'store'> {}
