import { IID, IOwnedEntity } from './base';

export interface ISku<O> extends IOwnedEntity<O> {
  name: string;
  description: string;
  barcode: string;
}

export interface ICreateSkuDto
  extends Pick<ISku<IID>, 'name' | 'description' | 'barcode' | 'owner'> {}
