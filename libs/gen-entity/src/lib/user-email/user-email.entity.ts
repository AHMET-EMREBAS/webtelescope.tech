import { Column, Entity, Relation, BaseEntity } from '@webpackages/core';
import { IUserEmail } from '@webpackages/gen-model';
import { User } from '../user/user.entity';
@Entity()
export class UserEmail extends BaseEntity implements IUserEmail<User> {
  @Column({ type: 'string' }) email?: string;
  @Relation({ relationType: 'Owner', required: true, objectType: User })
  ownwer!: User;
}
