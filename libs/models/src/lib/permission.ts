import { PermissionModel } from '@webpackages/common';
import { BaseEntity } from './base';
import { Column, Entity } from 'typeorm';

@Entity()
export class Permission extends BaseEntity implements PermissionModel {
  @Column({ type: 'string', unique: true })
  name!: string;
  
}
