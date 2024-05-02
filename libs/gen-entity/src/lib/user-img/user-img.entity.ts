import { Column, Entity, Relation, BaseEntity } from '@webpackages/core';
import { IUserImg } from '@webpackages/gen-model';
import { User } from '../user/user.entity';
@Entity()
export class UserImg extends BaseEntity implements IUserImg<User> {
  /**
   * Image url
   */
  @Column({ type: 'string', required: true, description: 'Image url' })
  url!: string;
  @Column({ type: 'string' }) description?: string;
  @Relation({ relationType: 'Owner', required: true, objectType: User })
  user!: User;
}
