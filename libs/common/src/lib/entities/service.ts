import { IBaseEntity } from './base';
import { IRecord } from './record';

export interface IService extends IBaseEntity {
  name: string;
  description: string;
  details: IRecord[];
}
