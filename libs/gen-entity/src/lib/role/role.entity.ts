import { Column, Entity, Relation, BaseEntity } from '@webpackages/core';
import { IRole } from '@webpackages/gen-model';
import { Permission } from '../permission/permission.entity';
@Entity()
export class Role extends BaseEntity implements IRole<Permission> {
  /**
   * Required unique short text
   */ @Column({
    type: 'string',
    required: true,
    unique: true,
    description: 'Required unique short text',
  })
  name!: string;
  @Column({ type: 'string' }) description?: string;
  @Relation({ relationType: 'Many', objectType: Permission })
  permissions?: Permission[];
}
