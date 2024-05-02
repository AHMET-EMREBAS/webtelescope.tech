import { ViewEntity, ViewColumn } from '@webpackages/core';
import { ICategoryView } from '@webpackages/gen-model';
@ViewEntity()
export class CategoryView implements ICategoryView {
  /**
   * Required unique short text
   */
  @ViewColumn() name!: string;
}
