import { IBookmark } from '@webpackages/common';
import { OwnedEntity } from '../base';
import { User } from './user.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Bookmark extends OwnedEntity(User) implements IBookmark<User> {
  @Column({ type: 'varchar', unique: true }) label!: string;
  @Column({ type: 'varchar', unique: true }) link!: string;
}
