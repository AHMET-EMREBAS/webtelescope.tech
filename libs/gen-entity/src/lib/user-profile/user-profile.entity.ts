import { Column, Entity, Relation, BaseEntity } from '@webpackages/core';
import { IUserProfile } from '@webpackages/gen-model';
import { User } from '../user/user.entity';
@Entity()
export class UserProfile extends BaseEntity implements IUserProfile<User> {
  @Column({ type: 'string' }) firstName?: string;
  @Column({ type: 'string' }) lastName?: string;
  @Relation({ relationType: 'Owner', required: true, objectType: User })
  user!: User;
}
