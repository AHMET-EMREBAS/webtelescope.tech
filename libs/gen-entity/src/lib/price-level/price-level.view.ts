import { ViewEntity, ViewColumn } from '@webpackages/core';
import { IPriceLevelView } from '@webpackages/gen-model';
import { PriceLevel } from './price-level.entity';
import { BaseView } from '@webpackages/core';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('priceLevel.id', 'id')
      .addSelect('priceLevel.name', 'name')

      .from(PriceLevel, 'priceLevel');
  },
})
export class PriceLevelView extends BaseView implements IPriceLevelView {
  /**
   * Required unique short text
   */
  @ViewColumn() name!: string;
}
