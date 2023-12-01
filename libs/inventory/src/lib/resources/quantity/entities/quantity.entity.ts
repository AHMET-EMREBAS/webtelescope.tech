import { BaseEntity, Relation } from '@webpackages/core';
import { Column, Entity } from 'typeorm';
import { Sku } from '../../sku';
import { Store } from '../../store';

@Entity()
export class Quantity extends BaseEntity {
  @Column({ type: 'numeric' }) quantity!: string;
  @Relation({ type: 'owner', target: Sku }) sku!: Sku;
  @Relation({ type: 'owner', target: Store }) store!: Store;
}
