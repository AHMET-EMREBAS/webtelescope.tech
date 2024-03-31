import { IRole } from '@webpackages/model';
import { Permission } from './permission';
import {
  IDEntity,
  ManyRelation,
  NameColumn,
  Entity,
} from '@webpackages/typeorm';

@Entity()
export class Role extends IDEntity implements IRole<Permission> {
  @NameColumn() role!: string;
  @ManyRelation(Permission) permissions!: Permission[];
}
