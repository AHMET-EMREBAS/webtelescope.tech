import { IBaseEntity } from './base';

export interface IImage extends IBaseEntity {
  name: string;
  description: string;
  uri: string;
}
