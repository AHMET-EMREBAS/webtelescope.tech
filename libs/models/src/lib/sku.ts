import { SkuModel } from '@webpackages/common';
import { BaseEntity } from './base';
import { Product } from './product';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Sku extends BaseEntity implements SkuModel<Product> {
  @Column({ type: 'varchar', unique: true })
  name!: string;

  @Column({ type: 'varchar', unique: true })
  barcode!: string;

  @ManyToOne(() => Product, (p) => p.id, { eager: true })
  @JoinColumn()
  product!: Product;
}
