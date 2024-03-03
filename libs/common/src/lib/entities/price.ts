import { IBasicEntity, IID } from './base';

export interface IPrice<P, S> extends IBasicEntity {
  price: number;
  cost: number;
  sku: S;
  priceLevel: P;
}

export interface ICreatePriceDto
  extends Pick<IPrice<IID, IID>, 'price' | 'cost' | 'sku' | 'priceLevel'> {}

export interface IUpdatePriceDto extends Partial<ICreatePriceDto> {}
