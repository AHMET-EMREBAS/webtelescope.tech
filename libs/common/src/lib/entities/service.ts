import { ITimestampEntity } from './base';

export interface IService extends ITimestampEntity {
  name: string;
  description: string;
}

export interface ICreateServiceDto
  extends Pick<IService, 'name' | 'description'> {}

export interface IUpdateServiceDto extends Partial<ICreateServiceDto> {}
