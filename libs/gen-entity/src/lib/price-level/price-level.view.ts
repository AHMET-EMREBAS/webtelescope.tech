import { ViewEntity, ViewColumn } from '@webpackages/core';
import { IPriceLevelView } from '@webpackages/gen-model';
import { PriceLevel } from './price-level.entity';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('priceLevel.id', 'priceLevelId')
      .addSelect('priceLevel.name', 'name')

      .from(PriceLevel, 'priceLevel');
  },
})
export class PriceLevelView implements IPriceLevelView {
  /**
   * Required unique short text
   */
  @ViewColumn() name!: string;
}