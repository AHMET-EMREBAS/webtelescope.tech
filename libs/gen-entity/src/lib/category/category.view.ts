import { ViewEntity, ViewColumn } from '@webpackages/core';
import { ICategoryView } from '@webpackages/gen-model';
import { Category } from './category.entity';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('category.id', 'categoryId')
      .addSelect('category.name', 'name')

      .from(Category, 'category');
  },
})
export class CategoryView implements ICategoryView {
  /**
   * Required unique short text
   */
  @ViewColumn() name!: string;
}
