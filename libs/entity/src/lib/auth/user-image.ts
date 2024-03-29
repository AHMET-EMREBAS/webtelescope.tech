import { IImg } from '@webpackages/model';
import { OwnerRelation, TextColumn, TimestampEntity } from '../common';
import { User } from './user';
import { Entity } from 'typeorm';

@Entity()
export class UserImage extends TimestampEntity implements IImg<User> {
  @TextColumn() imageName!: string;
  @TextColumn() href!: string;
  @OwnerRelation(User) owner!: User;
}
