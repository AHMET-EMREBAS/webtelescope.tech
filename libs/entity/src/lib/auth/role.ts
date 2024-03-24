import { IRole } from '@webpackages/model';
import { Permission } from './permission';
import { ManyRelation, NameEntity } from '../common';
import { Entity } from 'typeorm';

@Entity()
export class Role extends NameEntity implements IRole<Permission> {
  @ManyRelation(Permission)
  permissions!: Permission[];
}
