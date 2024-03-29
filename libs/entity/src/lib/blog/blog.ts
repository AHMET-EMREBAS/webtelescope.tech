import { IBlog } from '@webpackages/model';
import { NameColumn, OwnerRelation, TimestampEntity } from '../common';
import { User } from '../auth';
import { Entity } from 'typeorm';

@Entity()
export class Blog extends TimestampEntity implements IBlog<User> {
  @NameColumn() title!: string;
  @OwnerRelation(User) author!: User;
}
