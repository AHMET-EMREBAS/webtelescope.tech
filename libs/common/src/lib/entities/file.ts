import { IBaseEntity } from './base';

export interface IFile extends IBaseEntity {
  name: string;
  description: string;
  uri: string;
}
