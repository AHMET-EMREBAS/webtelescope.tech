import { Column, Entity, Relation, BaseEntity } from '@webpackages/core';
import { ITask } from '@webpackages/common';
import { User } from '../user/user.entity';
import { User } from '../user/user.entity';
import { Sprint } from '../sprint/sprint.entity';
@Entity()
export class Task extends BaseEntity implements ITask {
  @Column({ type: 'string', required: true }) title!: string;
  @Column({ type: 'string' }) description?: string;
  @Column({ type: 'string' }) difficulty?: string;
  @Column({ type: 'date' }) due?: date;
  @Column({ type: 'date' }) startDate?: date;
  @Column({ type: 'date' }) endDate?: date;
  @Relation({ relationType: 'One', objectType: User }) assignees?: User;
  @Relation({ relationType: 'One', objectType: User }) createdBy?: User;
  @Relation({ relationType: 'One', objectType: Sprint }) sprint?: Sprint;
}
