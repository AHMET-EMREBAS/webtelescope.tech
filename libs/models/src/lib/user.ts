import { PermissionModel, RoleModel, UserModel } from '@webpackages/common';
import { BaseEntity } from './base';
import { Role } from './role';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity()
export class User
  extends BaseEntity
  implements UserModel<RoleModel<PermissionModel>>
{
  @Column({ type: 'varchar', unique: true })
  username!: string;

  @Column({ type: 'varchar' })
  password!: string;

  @ManyToMany(() => Role, (r) => r.id, { eager: true })
  @JoinTable()
  roles!: Role[];
}
