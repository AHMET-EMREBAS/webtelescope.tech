import { IBlog } from '@webpackages/model';
import {
  OwnerRelation,
  TimestampEntity,
  Entity,
  UniqueNameColumn,
} from '@webpackages/typeorm';
import { User } from '../auth';

@Entity()
export class Blog extends TimestampEntity implements IBlog<User> {
  @UniqueNameColumn() title!: string;
  @OwnerRelation(User) author!: User;
}
