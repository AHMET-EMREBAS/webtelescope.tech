import { IID } from '@webpackages/common';
export interface ICreatePriceDto {
  /**
   * Price
   */
  price: number;
  /**
   * Cost
   */
  cost: number;
  priceLevel: IID;
  product: IID;
}
