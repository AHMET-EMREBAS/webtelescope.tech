import { IPhone } from '@webpackages/model';
import { OwnerRelation, TextColumn, TimestampEntity } from '../common';
import { User } from './user';
import { Entity } from 'typeorm';

@Entity()
export class UserPhone extends TimestampEntity implements IPhone<User> {
  @TextColumn() phone!: string;
  @OwnerRelation(User) user!: User;
}
