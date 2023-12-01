import { BaseEntity, Relation } from '@webpackages/core';
import { Column, Entity } from 'typeorm';
import { PriceLevel } from '../../price-level';
import { Sku } from '../../sku';

@Entity()
export class Price extends BaseEntity {
  @Column({ type: 'numeric' }) price!: number;
  @Column({ type: 'numeric' }) cost!: number;

  @Relation({ type: 'owner', target: Sku })
  sku!: Sku;

  @Relation({ type: 'owner', target: PriceLevel })
  priceLevel!: PriceLevel;
}
