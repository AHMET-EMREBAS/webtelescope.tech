import { IOwnedEntity } from './base';

export interface ISku<O> extends IOwnedEntity<O> {
  name: string;
  description: string;
  barcode: string;
}
