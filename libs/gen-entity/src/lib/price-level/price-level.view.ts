import { ViewEntity, ViewColumn } from '@webpackages/core';
import { IPriceLevelView } from '@webpackages/gen-model';
@ViewEntity()
export class PriceLevelView implements IPriceLevelView {
  /**
   * Required unique short text
   */
  @ViewColumn() name!: string;
}
