import { ITask, Range10 } from '@webpackages/model';
import { Sprint } from './sprint';

import { User } from '../auth';
import { Tag } from './tag';
import {
  DateColumn,
  ManyRelation,
  NameColumn,
  NumberColumn,
  OneRelation,
  OwnerRelation,
  TextColumn,
  TimestampEntity,
  Entity,
} from '@webpackages/typeorm';
import { Project } from './project';

@Entity()
export class Task
  extends TimestampEntity
  implements ITask<Project, Sprint, User, Tag>
{
  @NameColumn() taskTitle!: string;
  @TextColumn() taskDescription!: string;
  @TextColumn() status!: string;
  @NumberColumn() difficulty!: Range10;
  @NumberColumn() priority!: Range10;
  @DateColumn() due!: Date;
  @ManyRelation(Tag) tags!: Tag[];
  @OwnerRelation(Project) project!: Project;
  @OneRelation(Sprint) sprint!: Sprint;
  @ManyRelation(User) assignees!: User[];
}
