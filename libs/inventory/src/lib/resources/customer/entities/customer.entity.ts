import { BaseUserEntity, Relation } from '@webpackages/core';
import { Column, Entity } from 'typeorm';
import { PriceLevel } from '../../price-level';

@Entity()
export class Customer extends BaseUserEntity {
  @Column({ type: 'varchar' })
  firstName!: string;

  @Column({ type: 'varchar' })
  lastName!: string;

  @Column({ type: 'varchar', unique: true })
  organization!: string;

  @Column({ type: 'varchar', unique: true })
  phone!: string;

  @Relation({ type: 'sub', target: PriceLevel })
  priceLevel!: PriceLevel;
}
