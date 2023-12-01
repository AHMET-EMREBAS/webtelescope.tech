import { BaseEntity, Relation } from '@webpackages/core';
import { Entity } from 'typeorm';
import { Sku } from '../../sku';
import { PriceLevel } from '../../price-level';
import { Customer } from '../../customer';

@Entity()
export class Order extends BaseEntity {
  @Relation({ type: 'subs', target: Sku })
  items!: Sku[];

  @Relation({ type: 'sub', target: PriceLevel })
  priceLevel!: PriceLevel;

  @Relation({ type: 'owner', target: Customer })
  customer!: Customer;
}
