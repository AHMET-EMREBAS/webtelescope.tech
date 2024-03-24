import { IUser } from '@webpackages/model';
import {
  ManyRelation,
  NameColumn,
  OwnerRelation,
  PasswordColumn,
  TimestampEntity,
} from '../common';
import { Organization } from './organization';
import { Role } from './role';
import { Entity } from 'typeorm';

@Entity()
export class User extends TimestampEntity implements IUser<Organization, Role> {
  @NameColumn() username!: string;

  @PasswordColumn() password!: string;

  @OwnerRelation(Organization) organization!: Organization;

  @ManyRelation(Role) roles!: Role[];
}
