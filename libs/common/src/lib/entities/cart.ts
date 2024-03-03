import { IID, IOwnedEntity } from './base';

export interface ICart<U> extends IOwnedEntity<U> {}

export interface ICreateCart extends Pick<ICart<IID>, 'owner'> {}
export interface IUpdateCart extends Partial<ICreateCart> {}
