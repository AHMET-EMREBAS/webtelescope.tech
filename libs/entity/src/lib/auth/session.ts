import { ISession } from '@webpackages/model';
import {
  ObjectColumn,
  OwnerRelation,
  TextColumn,
  TimestampEntity,
} from '../common';
import { Entity } from 'typeorm';
import { User } from './user';

@Entity()
export class Session extends TimestampEntity implements ISession<User> {
  @TextColumn() deviceId!: string;
  @ObjectColumn() permissions!: string[];
  @OwnerRelation(User) user!: User;
}
