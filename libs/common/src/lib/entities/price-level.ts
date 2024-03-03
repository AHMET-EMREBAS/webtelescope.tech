import { IBasicEntity } from './base';

export interface IPriceLevel extends IBasicEntity {
  name: string;
}

export interface ICreatePriceLevelDto extends Pick<IPriceLevel, 'name'> {}

export interface IUpdatePriceLevelDto extends Partial<ICreatePriceLevelDto> {}
