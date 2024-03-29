import { Entity } from 'typeorm';
import { OwnerRelation, TimestampEntity } from '../common';
import { User } from './user';

@Entity()
export class UserProfile extends TimestampEntity {
  @OwnerRelation(User) user!: User;
}
