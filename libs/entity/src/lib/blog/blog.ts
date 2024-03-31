import { IBlog } from '@webpackages/model';
import {
  NameColumn,
  OwnerRelation,
  TimestampEntity,
  Entity,
} from '@webpackages/typeorm';
import { User } from '../auth';

@Entity()
export class Blog extends TimestampEntity implements IBlog<User> {
  @NameColumn() title!: string;
  @OwnerRelation(User) author!: User;
}
