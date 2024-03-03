import { ITimestampEntity } from './base';

export interface IService extends ITimestampEntity {
  name: string;
  description: string;
}
