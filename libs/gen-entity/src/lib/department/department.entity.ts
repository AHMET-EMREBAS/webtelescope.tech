import { Column, Entity, Relation, BaseEntity } from '@webpackages/core';
import { IDepartment } from '@webpackages/gen-model';
@Entity()
export class Department extends BaseEntity implements IDepartment {
  @Column({ type: 'string', required: true, unique: true }) name!: string;
}
