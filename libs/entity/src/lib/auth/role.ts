import { IRole } from '@webpackages/model';
import { Permission } from './permission';
import {
  IDEntity,
  ManyRelation,
  StringColumn,
  Entity,
} from '@webpackages/typeorm';

@Entity()
export class Role extends IDEntity implements IRole<Permission> {
  @StringColumn() role!: string;
  @ManyRelation(Permission) permissions!: Permission[];
}
