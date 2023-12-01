import { BaseEntity, Relation } from '@webpackages/core';
import { Column, Entity } from 'typeorm';
import { PriceLevel } from '../../price-level';

@Entity()
export class Store extends BaseEntity {
  @Column({ type: 'varchar', unique: true }) name!: string;

  @Relation({ type: 'sub', target: PriceLevel })
  priceLevel!: PriceLevel;
}
