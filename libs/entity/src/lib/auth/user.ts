import { IUser } from '@webpackages/model';
import {
  ManyRelation,
  StringColumn,
  OwnerRelation,
  PasswordColumn,
  TimestampEntity,
  Entity,
} from '@webpackages/typeorm';
import { Organization } from './organization';
import { Role } from './role';
import {
  AddressEntity,
  EmailEntity,
  ImageEntity,
  RecordEntity,
} from '../common';

@Entity()
export class User extends TimestampEntity implements IUser<Organization, Role> {
  @StringColumn({ unique: true }) username!: string;
  @PasswordColumn() password!: string;
  @OwnerRelation(Organization) organization!: Organization;
  @ManyRelation(Role) roles!: Role[];
}

@Entity()
export class UserEmail extends EmailEntity(User) {}

@Entity()
export class UserAddress extends AddressEntity(User) {}

@Entity()
export class UserImage extends ImageEntity(User) {}

@Entity()
export class UserRecord extends RecordEntity(User) {}
