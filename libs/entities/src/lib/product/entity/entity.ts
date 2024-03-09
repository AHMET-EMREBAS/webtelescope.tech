import { BaseEntity, Entity, Column } from '@webpackages/core';

@Entity()
export class Product extends BaseEntity {
  @Column({ type: 'string', required: true })
  name!: string;
}
