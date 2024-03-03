import { IID, IOwnedEntity } from './base';

export interface IQuantity<T, S> extends IOwnedEntity<T> {
  quantity: number;
  store: S;
}

export interface ICreateQuantityDto
  extends Pick<IQuantity<IID, IID>, 'owner' | 'quantity' | 'store'> {}

export interface IUpdateQuantityDto extends Partial<ICreateQuantityDto> {}

