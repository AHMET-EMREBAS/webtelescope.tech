import { Column, Entity, Relation, BaseEntity } from '@webpackages/core';
import { ICategory } from '@webpackages/gen-model';
@Entity()
export class Category extends BaseEntity implements ICategory {
  @Column({ type: 'string', required: true, unique: true }) name!: string;
}
