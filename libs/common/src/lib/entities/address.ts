import { IBaseEntity } from './base';

export interface IAddress extends IBaseEntity {
  unit: string;
  street: string;
  city: string;
  state: string;
  zip: string;
}
