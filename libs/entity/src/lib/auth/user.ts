import { IUser } from '@webpackages/model';
import {
  ManyRelation,
  StringColumn,
  TimestampEntity,
  Entity,
  OwnerRelation,
} from '@webpackages/typeorm';
import { Org } from './org';
import { Role } from './role';
import {
  AddressEntity,
  EmailEntity,
  ImageEntity,
  RecordEntity,
} from '../common';

@Entity()
export class User extends TimestampEntity implements IUser<Org, Role> {
  @StringColumn({ unique: true }) username!: string;
  @StringColumn() password!: string;
  @OwnerRelation(Org) organization!: Org;
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
