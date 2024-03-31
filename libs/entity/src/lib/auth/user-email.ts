import { IEmail } from '@webpackages/model';
import {
  OwnerRelation,
  TextColumn,
  TimestampEntity,
  Entity,
} from '@webpackages/typeorm';
import { User } from './user';

@Entity()
export class UserEmail extends TimestampEntity implements IEmail<User> {
  @TextColumn() email!: string;
  @OwnerRelation(User) user!: User;
}
