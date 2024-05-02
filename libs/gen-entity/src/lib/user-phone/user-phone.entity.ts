import { Column, Entity, Relation, BaseEntity } from '@webpackages/core';
import { IUserPhone } from '@webpackages/gen-model';
import { User } from '../user/user.entity';
@Entity()
export class UserPhone extends BaseEntity implements IUserPhone<User> {
  @Column({ type: 'string' }) email?: string;
  @Relation({ relationType: 'Owner', required: true, objectType: User })
  ownwer!: User;
}
