import { Column, Entity, Relation, BaseEntity } from '@webpackages/core';
import { IProductImg } from '@webpackages/gen-model';
import { Product } from '../product/product.entity';
@Entity()
export class ProductImg extends BaseEntity implements IProductImg<Product> {
  /**
   * Image url
   */
  @Column({ type: 'string', required: true, description: 'Image url' })
  url!: string;
  @Column({ type: 'string' }) description?: string;
  @Relation({ relationType: 'Owner', required: true, objectType: Product })
  owner!: Product;
}
