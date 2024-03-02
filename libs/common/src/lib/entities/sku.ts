import { IBaseEntity } from './base';
import { IProduct } from './product';
import { IRecord } from './record';

export interface ISku extends IBaseEntity {
  sku: string;
  description: string;
  details: IRecord;
  product: IProduct;
}
