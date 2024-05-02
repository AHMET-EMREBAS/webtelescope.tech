import { Column, Entity, Relation, BaseEntity } from '@webpackages/core';
import { IUserProfile } from '@webpackages/common';
@Entity()
export class UserProfile extends BaseEntity implements IUserProfile {
  @Column({ type: 'string' }) firstName?: string;
  @Column({ type: 'string' }) lastName?: string;
}
