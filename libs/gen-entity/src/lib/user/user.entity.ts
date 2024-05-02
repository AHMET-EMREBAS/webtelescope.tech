import { Column, Entity, Relation, BaseEntity } from '@webpackages/core';
import { IUser } from '@webpackages/gen-model';
import { Role } from '../role/role.entity';
import { Department } from '../department/department.entity';
@Entity()
export class User extends BaseEntity implements IUser<Role, Department> {
  @Column({ type: 'string', required: true, unique: true }) username!: string;
  @Column({ type: 'string', required: true }) password!: string;
  @Relation({ relationType: 'Many', objectType: Role }) role?: Role[];
  @Relation({ relationType: 'Many', objectType: Department })
  department?: Department[];
}
