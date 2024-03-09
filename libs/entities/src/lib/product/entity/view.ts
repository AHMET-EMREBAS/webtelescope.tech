import { ViewColumn, ViewEntity } from 'typeorm';
import { Product } from './entity';

@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select()
      .addSelect('main.id', 'id')
      .addSelect('main.name', 'name')
      .from(Product, 'main');
  },
})
export class ProductView {
  @ViewColumn() id!: number;
  @ViewColumn() name!: string;
}
