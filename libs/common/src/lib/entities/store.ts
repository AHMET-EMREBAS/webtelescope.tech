import { IBasicEntity } from './base';

export interface IStore extends IBasicEntity {
  name: string;
}

export interface ICreateStoreDto extends Pick<IStore, 'name'> {}

export interface IUpdateStoreDto extends Partial<ICreateStoreDto> {}
