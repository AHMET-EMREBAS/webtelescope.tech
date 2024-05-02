import { ViewEntity, ViewColumn } from '@webpackages/core';
import { ICategoryView } from '@webpackages/gen-model';
import { Category } from './category.entity';
import { BaseView } from '@webpackages/core';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('category.id', 'id')
      .addSelect('category.name', 'name')

      .from(Category, 'category');
  },
})
export class CategoryView extends BaseView implements ICategoryView {
  /**
   * Required unique short text
   */
  @ViewColumn() name!: string;
}
