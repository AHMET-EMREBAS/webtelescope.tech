import { IRecord } from '@webpackages/model';
import {
  ObjectColumn,
  OwnerRelation,
  TimestampEntity,
  Entity,
} from '@webpackages/typeorm';
import { User } from './user';

@Entity()
export class UserRecord extends TimestampEntity implements IRecord<User> {
  @ObjectColumn() record!: Record<string, string>;
  @OwnerRelation(User) owner!: User;
}
