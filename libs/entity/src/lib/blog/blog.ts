import { IBlog } from '@webpackages/model';
import {
  StringColumn,
  OwnerRelation,
  TimestampEntity,
  Entity,
} from '@webpackages/typeorm';
import { User } from '../auth';

@Entity()
export class Blog extends TimestampEntity implements IBlog<User> {
  @StringColumn() title!: string;
  @OwnerRelation(User) author!: User;
}
