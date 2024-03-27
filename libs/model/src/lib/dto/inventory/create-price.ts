import { IID } from '../../common';
import { IPrice } from '../../model';

export interface ICreatePriceDto
  extends Pick<IPrice<IID, IID>, 'price' | 'cost' | 'priceLevel' | 'sku'> {}
