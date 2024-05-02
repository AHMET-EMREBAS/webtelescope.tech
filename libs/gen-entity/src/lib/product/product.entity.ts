import { Column, Entity, Relation, BaseEntity } from '@webpackages/core';
import { IProduct } from '@webpackages/gen-model';
import { Category } from '../category/category.entity';
import { Department } from '../department/department.entity';
@Entity()
export class Product extends BaseEntity implements IProduct {
  @Column({ type: 'string', required: true, unique: true }) name!: string;
  @Column({ type: 'string' }) description?: string;
  @Relation({ relationType: 'Many', objectType: Category })
  category?: Category[];
  @Relation({ relationType: 'One', objectType: Department })
  department?: Department;
}
