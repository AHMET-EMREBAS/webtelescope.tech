import { Column, Entity, Relation, BaseEntity } from '@webpackages/core';
import { IRole } from '@webpackages/common';
import { Permission } from '../permission/permission.entity';
@Entity()
export class Role extends BaseEntity implements IRole {
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
