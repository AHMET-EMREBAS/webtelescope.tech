import { PriceModel } from '@webpackages/common';
import { BaseEntity } from './base';
import { PriceLevel } from './price-level';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Sku } from './sku';

@Entity()
export class Price extends BaseEntity implements PriceModel<PriceLevel, Sku> {
  @Column({ type: 'numeric' })
  price!: number;

  @Column({ type: 'numeric' })
  cost!: number;

  @ManyToOne(() => PriceLevel, (p) => p.id, { eager: true })
  @JoinColumn()
  priceLevel!: PriceLevel;

  @ManyToOne(() => Sku, (s) => s.id, { eager: true })
  @JoinColumn()
  sku!: Sku;
}
