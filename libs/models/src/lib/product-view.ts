import { ViewColumn, ViewEntity } from 'typeorm';
import { Price } from './price';
import { Product } from './product';
import { Store } from './store';

@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('product.id', 'id')
      .addSelect('product.name', 'name')
      .addSelect('price.price', 'price')
      .addSelect('price.cost', 'cost')
      .addSelect('price.id', 'priceId')
      .addSelect('store.id', 'storeId')
      .addSelect('price.priceLevelid', 'priceLevelId')
      .from(Price, 'price')
      .leftJoin(Product, 'product', 'product.id = price.productId')
      .leftJoin(Store, 'store', 'store.priceLevelId = price.priceLevelId');
  },
})
export class ProductView {
  @ViewColumn() id!: number;
  @ViewColumn() name!: string;
  @ViewColumn() price!: number;
  @ViewColumn() cost!: number;
  @ViewColumn() priceId!: number;
  @ViewColumn() storeId!: number;
  @ViewColumn() priceLevelId!: number;
}
