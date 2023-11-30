import { Relation, Column, Entity, BaseEntity } from '@webpackages/core';
import { Category } from '../category';
@Entity()
export class Sample extends BaseEntity {
  @Column({ type: 'string', required: true, unique: true })
  name!: string;
  @Relation({ type: 'sub', target: Category })
  category?: Category;
}
