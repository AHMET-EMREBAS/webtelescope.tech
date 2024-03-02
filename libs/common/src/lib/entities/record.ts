import { IBaseEntity } from './base';

export interface IRecord extends IBaseEntity {
  record: Record<string, string>;
}
