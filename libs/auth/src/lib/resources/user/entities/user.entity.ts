import { BaseUserEntity, Relation } from '@webpackages/core';
import { Entity } from 'typeorm';
import { Role } from '../../role';

@Entity()
export class User extends BaseUserEntity {
  @Relation({ type: 'subs', target: Role })
  roles!: Role[];
}
