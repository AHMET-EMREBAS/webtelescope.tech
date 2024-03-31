import { ISession } from '@webpackages/model';
import {
  ObjectColumn,
  OwnerRelation,
  TextColumn,
  TimestampEntity,
  Entity,
} from '@webpackages/typeorm';

import { User } from './user';

@Entity()
export class Session extends TimestampEntity implements ISession<User> {
  @TextColumn() deviceId!: string;
  @ObjectColumn() permissions!: string[];
  @OwnerRelation(User) user!: User;
}
