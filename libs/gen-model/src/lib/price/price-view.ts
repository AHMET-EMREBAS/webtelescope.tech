import { IID } from '@webpackages/common';
export interface IPriceView extends IID {
  /**
   * Price
   */
  price: number;
  /**
   * Cost
   */
  cost: number;
  priceLevelName: string;
  productBarcode: string;
  productName: string;
  productDescription: string;
}
