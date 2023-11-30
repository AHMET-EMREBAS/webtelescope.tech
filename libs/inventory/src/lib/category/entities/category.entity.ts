import { Relation, Column, Entity, BaseEntity } from '@webpackages/core';
@Entity()
export class Category extends BaseEntity {
  @Column({ type: 'string', required: true, unique: true })
  name!: string;
}
