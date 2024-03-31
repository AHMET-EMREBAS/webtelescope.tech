import { IImg } from '@webpackages/model';
import {
  OwnerRelation,
  TextColumn,
  TimestampEntity,
  Entity,
} from '@webpackages/typeorm';
import { User } from './user';

@Entity()
export class UserImage extends TimestampEntity implements IImg<User> {
  @TextColumn() imageName!: string;
  @TextColumn() href!: string;
  @OwnerRelation(User) owner!: User;
}
