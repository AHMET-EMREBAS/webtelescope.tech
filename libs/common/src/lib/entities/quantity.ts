import { IOwnedEntity } from './base';

export interface IQuantity<T, S> extends IOwnedEntity<T> {
  quantity: number;
  store: S;
}
