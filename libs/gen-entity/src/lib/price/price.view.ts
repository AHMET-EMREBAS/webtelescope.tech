import { ViewEntity, ViewColumn } from '@webpackages/core';
import { IPriceView } from '@webpackages/gen-model';
import { Price } from './price.entity';
import { PriceLevel } from '../price-level/price-level.entity';
import { Product } from '../product/product.entity';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('price.id', 'priceId')
      .addSelect('price.price', 'price')
      .addSelect('price.cost', 'cost')

      .addSelect('priceLevel.name', 'priceLevelName')
      .addSelect('product.barcode', 'productBarcode')
      .addSelect('product.name', 'productName')
      .addSelect('product.description', 'productDescription')
      .from(Price, 'price')
      .leftJoin(PriceLevel, 'priceLevel', 'priceLevel.id = price.priceLevelId')
      .leftJoin(Product, 'product', 'product.id = price.productId');
  },
})
export class PriceView implements IPriceView {
  /**
   * Price
   */
  @ViewColumn() price!: number;
  /**
   * Cost
   */
  @ViewColumn() cost!: number;
  @ViewColumn() priceLevelName!: string;
  @ViewColumn() productBarcode!: string;
  @ViewColumn() productName!: string;
  @ViewColumn() productDescription!: string;
}
