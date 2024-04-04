import { ISession } from '@webpackages/model';
import {
  OwnerRelation,
  TimestampEntity,
  Entity,
  StringColumn,
} from '@webpackages/typeorm';

import { User } from './user';

@Entity()
export class Session extends TimestampEntity implements ISession<User> {
  @StringColumn() deviceId!: string;
  @StringColumn({ isArray: true }) permissions!: string[];
  @OwnerRelation(User) user!: User;
}
