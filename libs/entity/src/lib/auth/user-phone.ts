import { IPhone } from '@webpackages/model';
import {
  OwnerRelation,
  TextColumn,
  TimestampEntity,
  Entity,
} from '@webpackages/typeorm';
import { User } from './user';

@Entity()
export class UserPhone extends TimestampEntity implements IPhone<User> {
  @TextColumn() phone!: string;
  @OwnerRelation(User) user!: User;
}
