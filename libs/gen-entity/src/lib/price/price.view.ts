import { ViewEntity, ViewColumn } from '@webpackages/core';
import { IPriceView } from '@webpackages/common';
@ViewEntity()
export class PriceView implements IPriceView {
  /**
   * Price
   */ @ViewColumn() price!: number;
  /**
   * Cost
   */ @ViewColumn() cost!: number;
  @ViewColumn() priceLevelName!: string;
  @ViewColumn() productBarcode!: string;
  @ViewColumn() productName!: string;
  @ViewColumn() productDescription?: string;
}
