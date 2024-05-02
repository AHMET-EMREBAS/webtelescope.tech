import { Column, Entity, Relation, BaseEntity } from '@webpackages/core';
import { IPrice } from '@webpackages/gen-model';
import { PriceLevel } from '../price-level/price-level.entity';
import { Product } from '../product/product.entity';
@Entity()
export class Price extends BaseEntity implements IPrice<PriceLevel, Product> {
  /**
   * Price
   */ @Column({ type: 'number', required: true, description: 'Price' })
  price!: number;
  /**
   * Cost
   */ @Column({ type: 'number', required: true, description: 'Cost' })
  cost!: number;
  @Relation({ relationType: 'Owner', required: true, objectType: PriceLevel })
  priceLevel!: PriceLevel;
  @Relation({ relationType: 'Owner', required: true, objectType: Product })
  product!: Product;
}
