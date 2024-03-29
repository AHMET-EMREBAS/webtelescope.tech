import { IEmail } from '@webpackages/model';
import { OwnerRelation, TextColumn, TimestampEntity } from '../common';
import { User } from './user';
import { Entity } from 'typeorm';

@Entity()
export class UserEmail extends TimestampEntity implements IEmail<User> {
  @TextColumn() email!: string;
  @OwnerRelation(User) user!: User;
}
