import { Column, Entity, Relation, BaseEntity } from '@webpackages/core';
import { IUser } from '@webpackages/gen-model';
import { Role } from '../role/role.entity';
import { UserDepartment } from '../user-department/user-department.entity';
@Entity()
export class User extends BaseEntity implements IUser<Role, UserDepartment> {
  @Column({ type: 'string', required: true, unique: true }) username!: string;
  @Column({ type: 'string', required: true }) password!: string;
  @Relation({ relationType: 'Many', objectType: Role }) roles?: Role[];
  @Relation({ relationType: 'One', objectType: UserDepartment })
  userDepartment?: UserDepartment;
}
