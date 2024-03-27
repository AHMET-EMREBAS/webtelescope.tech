import { IRole } from '@webpackages/model';
import { Permission } from './permission';
import { IDEntity, ManyRelation, NameColumn } from '../common';
import { Entity } from 'typeorm';

@Entity()
export class Role extends IDEntity implements IRole<Permission> {
  @NameColumn() role!: string;
  @ManyRelation(Permission) permissions!: Permission[];
}
