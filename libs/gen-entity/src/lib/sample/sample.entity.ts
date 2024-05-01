import { Column, Entity, BaseEntity } from '@webpackages/core';
import { ISample } from '@webpackages/gen-model';
import { Category } from '../category.entity';
@Entity()
export class Sample extends BaseEntity implements ISample {
  @Column({ name: 'name', type: 'string' }) name?: string;
  @Relation({ relationType: 'Many' }) category?: Category[];
}
