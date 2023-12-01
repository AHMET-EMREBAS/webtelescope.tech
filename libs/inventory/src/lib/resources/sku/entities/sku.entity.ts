import { BaseEntity, Relation } from '@webpackages/core';
import { Column, Entity } from 'typeorm';
import { Product } from '../../product';

@Entity()
export class Sku extends BaseEntity {
  @Column({ type: 'varchar' })
  sku!: string;

  @Column({ type: 'varchar', unique: true })
  barcode!: string;

  @Relation({ type: 'owner', target: Product })
  product!: Product;
}
