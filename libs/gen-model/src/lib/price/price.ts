import { IID } from '@webpackages/common';
export interface IPrice<TPriceLevel, TProduct> {
  /**
   * Price
   */ price: number;
  /**
   * Cost
   */ cost: number;
  priceLevel: TPriceLevel;
  product: TProduct;
}
