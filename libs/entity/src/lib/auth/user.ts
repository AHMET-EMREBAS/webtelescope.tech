import { IUser } from '@webpackages/model';
import {
  ManyRelation,
  NameColumn,
  OwnerRelation,
  PasswordColumn,
  TimestampEntity,
  Entity,
} from '@webpackages/typeorm';
import { Organization } from './organization';
import { Role } from './role';

@Entity()
export class User extends TimestampEntity implements IUser<Organization, Role> {
  @NameColumn() username!: string;

  @PasswordColumn() password!: string;

  @OwnerRelation(Organization) organization!: Organization;

  @ManyRelation(Role) roles!: Role[];
}
