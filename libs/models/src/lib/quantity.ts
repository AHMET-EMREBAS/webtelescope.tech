import { QuantityModel } from '@webpackages/common';
import { BaseEntity } from './base';
import { Product } from './product';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Quantity extends BaseEntity implements QuantityModel<Product> {
  @Column({ type: 'numeric' })
  quantity!: number;

  @ManyToOne(() => Product, (p) => p.id, { eager: true })
  @JoinColumn()
  product!: Product;
}
