import { ViewEntity, ViewColumn, DataSource } from 'typeorm';
import { Category } from './category.entity';

@ViewEntity({
  expression(ds: DataSource) {
    return ds
      .createQueryBuilder()
      .select('main.id', 'id')
      .addSelect('main.name', 'name')

      .from(Category, 'main');
  },
})
export class CategoryView {
  @ViewColumn() id?: number;
  @ViewColumn() name?: any;
}
