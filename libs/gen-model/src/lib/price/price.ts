import { IID } from '@webpackages/common';
export interface IPrice<TPriceLevel = IID, TProduct = IID> extends IID {
  /**
   * Price
   */
  price: number;
  /**
   * Cost
   */
  cost: number;
  priceLevel: TPriceLevel;
  product: TProduct;
}
