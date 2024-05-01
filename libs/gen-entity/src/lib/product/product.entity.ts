import { Column, Entity, Relation, BaseEntity } from '@webpackages/core';
import { IProduct } from '@webpackages/gen-model';
@Entity()
export class Product extends BaseEntity implements IProduct {
  @Column({ type: 'string', required: true, unique: true }) name!: string;
  @Column({ type: 'string' }) description?: string;
}
