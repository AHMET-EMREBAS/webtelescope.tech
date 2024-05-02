import { Column, Entity, Relation, BaseEntity } from '@webpackages/core';
import { IUserEmail } from '@webpackages/common';
import { User } from '../user/user.entity';
@Entity()
export class UserEmail extends BaseEntity implements IUserEmail {
  @Column({ type: 'string' }) email?: string;
  @Relation({ relationType: 'Owner', required: true, objectType: User })
  ownwer!: User;
}
