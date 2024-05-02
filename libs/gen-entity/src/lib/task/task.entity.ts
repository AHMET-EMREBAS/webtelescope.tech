import { Column, Entity, Relation, BaseEntity } from '@webpackages/core';
import { ITask } from '@webpackages/gen-model';
import { User } from '../user/user.entity';
import { Sprint } from '../sprint/sprint.entity';
@Entity()
export class Task extends BaseEntity implements ITask<User, Sprint> {
  @Column({ type: 'string', required: true }) title!: string;
  @Column({ type: 'string' }) description?: string;
  @Column({ type: 'string' }) difficulty?: string;
  @Column({ type: 'date' }) due?: Date;
  @Column({ type: 'date' }) startDate?: Date;
  @Column({ type: 'date' }) endDate?: Date;
  @Relation({ relationType: 'One', objectType: User }) user?: User;
  @Relation({ relationType: 'One', objectType: Sprint }) sprint?: Sprint;
}
