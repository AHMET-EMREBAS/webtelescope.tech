import { ViewEntity, ViewColumn } from '@webpackages/core';
import { IPriceLevelView } from '@webpackages/common';
@ViewEntity()
export class PriceLevelView implements IPriceLevelView {
  /**
   * Required unique short text
   */ @ViewColumn() name!: string;
}
