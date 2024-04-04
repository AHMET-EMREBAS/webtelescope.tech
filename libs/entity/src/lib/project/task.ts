import { ITask, Range10 } from '@webpackages/model';
import { Sprint } from './sprint';

import { User } from '../auth';
import { Tag } from './tag';
import {
  DateColumn,
  ManyRelation,
  StringColumn,
  NumberColumn,
  OneRelation,
  OwnerRelation,
  TimestampEntity,
  Entity,
} from '@webpackages/typeorm';
import { Project } from './project';

@Entity()
export class Task
  extends TimestampEntity
  implements ITask<Project, Sprint, User, Tag>
{
  @StringColumn() taskTitle!: string;
  @StringColumn({ required: false }) taskDescription!: string;
  @StringColumn({ required: false }) status!: string;
  @NumberColumn() difficulty!: Range10;
  @NumberColumn() priority!: Range10;
  @DateColumn() due!: Date;
  @ManyRelation(Tag) tags!: Tag[];
  @OwnerRelation(Project) project!: Project;
  @OneRelation(Sprint) sprint!: Sprint;
  @ManyRelation(User) assignees!: User[];
}
