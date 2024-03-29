import { IRecord } from '@webpackages/model';
import { ObjectColumn, OwnerRelation, TimestampEntity } from '../common';
import { User } from './user';
import { Entity } from 'typeorm';

@Entity()
export class UserRecord extends TimestampEntity implements IRecord<User> {
  @ObjectColumn() record!: Record<string, string>;
  @OwnerRelation(User) owner!: User;
}
