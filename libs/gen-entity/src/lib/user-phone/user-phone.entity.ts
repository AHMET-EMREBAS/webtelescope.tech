import { Column, Entity, Relation, BaseEntity } from '@webpackages/core';
import { IUserPhone } from '@webpackages/common';
import { User } from '../user/user.entity';
@Entity()
export class UserPhone extends BaseEntity implements IUserPhone {
  @Column({ type: 'string' }) email?: string;
  @Relation({ relationType: 'Owner', required: true, objectType: User })
  ownwer!: User;
}
