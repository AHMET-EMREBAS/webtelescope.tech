import { PriceModel } from '@webpackages/common';
import { BaseEntity } from './base';
import { PriceLevel } from './price-level';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Price extends BaseEntity implements PriceModel<PriceLevel> {
  @Column({ type: 'numeric' })
  price!: number;

  @Column({ type: 'numeric' })
  cost!: number;

  @ManyToOne(() => PriceLevel, (p) => p.id, { eager: true })
  @JoinColumn()
  priceLevel!: PriceLevel;
}
