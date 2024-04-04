import { ISprint } from '@webpackages/model';
import {
  StringColumn,
  OwnerRelation,
  TimestampEntity,
  Entity,
} from '@webpackages/typeorm';
import { Project } from './project';

@Entity()
export class Sprint extends TimestampEntity implements ISprint<Project> {
  @StringColumn() sprintName!: string;
  @OwnerRelation(Project) project!: Project;
}
