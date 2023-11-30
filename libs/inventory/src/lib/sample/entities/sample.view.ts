import { ViewEntity, ViewColumn, DataSource } from 'typeorm';
import { Sample } from './sample.entity';
import { Category } from '../../category';

@ViewEntity({
  expression(ds: DataSource) {
    return ds
      .createQueryBuilder()
      .select('main.id', 'id')
      .addSelect('main.name', 'name')
      .addSelect('category.name', 'category')
      .from(Sample, 'main')
      .leftJoin(Category, 'category', 'category.id = main.categoryId');
  },
})
export class SampleView {
  @ViewColumn() id?: number;
  @ViewColumn() name?: any;
  @ViewColumn() category?: any;
}
