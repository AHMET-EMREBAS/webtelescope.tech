import { Column, Entity, BaseEntity } from '@webpackages/core';

@Entity()
export class Category extends BaseEntity {
  @Column({ type: 'string' }) name?: string;
}
