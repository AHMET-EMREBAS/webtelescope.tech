import { Column, Entity, Relation, BaseEntity } from '@webpackages/core';
import { ISample } from '@webpackages/gen-model';
import { Category } from '../category/category.entity';
@Entity()
export class Sample extends BaseEntity implements ISample {
  @Column({ name: 'name', type: 'string' }) name?: string;
  @Relation({ relationType: 'Many', objectType: Category })
  category?: Category[];
}
