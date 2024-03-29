import { IAddress } from '@webpackages/model';
import { OwnerRelation, TextColumn, TimestampEntity } from '../common';
import { User } from './user';
import { Entity } from 'typeorm';

@Entity()
export class UserAddress extends TimestampEntity implements IAddress<User> {
  @TextColumn() street!: string;
  @TextColumn() unit!: string;
  @TextColumn() city!: string;
  @TextColumn() state!: string;
  @TextColumn() zip!: string;
  @TextColumn() country!: string;
  @OwnerRelation(User) user!: User;
}
