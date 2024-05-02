import { Column, Entity, Relation, BaseEntity } from '@webpackages/core';
import { IUserContact } from '@webpackages/gen-model';
import { User } from '../user/user.entity';
@Entity()
export class UserContact extends BaseEntity implements IUserContact<User> {
  @Column({ type: 'string' }) state?: string;
  @Column({ type: 'string' }) city?: string;
  @Column({ type: 'string' }) street?: string;
  @Column({ type: 'string' }) zip?: string;
  @Relation({ relationType: 'Owner', required: true, objectType: User })
  user!: User;
}
