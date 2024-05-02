import { Column, Entity, Relation, BaseEntity } from '@webpackages/core';
import { IProductImg } from '@webpackages/common';
import { Product } from '../product/product.entity';
@Entity()
export class ProductImg extends BaseEntity implements IProductImg {
  /**
   * Image url
   */ @Column({ type: 'string', required: true, description: 'Image url' })
  url!: string;
  @Column({ type: 'string' }) description?: string;
  @Relation({ relationType: 'Owner', required: true, objectType: Product })
  owner!: Product;
}
