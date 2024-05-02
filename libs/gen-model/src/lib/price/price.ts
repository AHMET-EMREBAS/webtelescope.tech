import { IID } from '@webpackages/common';
export interface IPrice {
  /**
   * Price
   */ price: number;
  /**
   * Cost
   */ cost: number;
  priceLevel: TPriceLevel;
  product: TProduct;
}
