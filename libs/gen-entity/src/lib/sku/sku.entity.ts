import { Column, Entity, Relation, BaseEntity } from '@webpackages/core';
import { ISku } from '@webpackages/gen-model';
import { Product } from '../product/product.entity';
@Entity()
export class Sku extends BaseEntity implements ISku<Product> {
  @Column({ type: 'string', required: true, unique: true }) barcode!: string;
  @Column({ type: 'string', required: true, unique: true }) sku!: string;
  /**
   * Required unique short text
   */
  @Column({
    type: 'string',
    required: true,
    unique: true,
    description: 'Required unique short text',
  })
  name!: string;
  @Column({ type: 'string' }) description?: string;
  @Relation({ relationType: 'Owner', required: true, objectType: Product })
  product!: Product;
}
