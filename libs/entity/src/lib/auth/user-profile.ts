import { OwnerRelation, TimestampEntity, Entity } from '@webpackages/typeorm';
import { User } from './user';

@Entity()
export class UserProfile extends TimestampEntity {
  @OwnerRelation(User) user!: User;
}
