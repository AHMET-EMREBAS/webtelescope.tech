import { IID } from '@webpackages/common';
export interface IUpdatePriceDto {
  /**
   * Price
   */ price?: number;
  /**
   * Cost
   */ cost?: number;
  priceLevel?: IID;
  product?: IID;
}
