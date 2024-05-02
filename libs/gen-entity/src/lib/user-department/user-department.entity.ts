import { Column, Entity, Relation, BaseEntity } from '@webpackages/core';
import { IUserDepartment } from '@webpackages/gen-model';
@Entity()
export class UserDepartment extends BaseEntity implements IUserDepartment {
  @Column({ type: 'string', required: true, unique: true }) name!: string;
}
