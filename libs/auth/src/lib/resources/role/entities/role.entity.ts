import { BaseNameEntity, Relation } from '@webpackages/core';
import { Entity } from 'typeorm';
import { Permission } from '../../permission';

@Entity()
export class Role extends BaseNameEntity {
  @Relation({ type: 'subs', target: Permission })
  permissions?: Permission[];
}
