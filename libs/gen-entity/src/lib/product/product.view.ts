import { ViewEntity, ViewColumn } from '@webpackages/core';
import { IProductView } from '@webpackages/gen-model';
import { Product } from './product.entity';
import { Category } from '../category/category.entity';
import { Department } from '../department/department.entity';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('product.id', 'productId')
      .addSelect('product.description', 'description')
      .addSelect('product.checked', 'checked')
      .addSelect('category.name', 'categoryName')
      .addSelect('department.name', 'departmentName')
      .from(Product, 'product')
      .leftJoin(Category, 'category', 'category.id = product.categoryId')
      .leftJoin(
        Department,
        'department',
        'department.id = product.departmentId'
      );
  },
})
export class ProductView implements IProductView {
  @ViewColumn() barcode!: string;
  /**
   * Required unique short text
   */
  @ViewColumn() name!: string;
  @ViewColumn() description!: string;
  @ViewColumn() categoryName!: string;
  @ViewColumn() departmentName!: string;
}
