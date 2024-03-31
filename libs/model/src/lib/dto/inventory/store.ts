import { IID } from '../../common';
import { IStore } from '../../model';

export interface ICreateStoreDto
  extends Pick<IStore<IID>, 'storeName' | 'priceLevel'> {}
