import { Column, Entity, Many, TimestampEntity } from '@webpackages/core';
import { Role } from './role';
import { IUser } from '@webpackages/common';
import { Scope } from './scope';

@Entity()
export class User extends TimestampEntity implements IUser {
  @Column({ type: 'string', unique: true }) username!: string;
  @Column({ type: 'string' }) password!: string;

  @Many(Role) roles?: Role[];
  @Many(Role) scopes?: Scope[];
}
