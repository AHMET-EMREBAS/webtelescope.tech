import { ISprint } from '@webpackages/model';
import {
  NameColumn,
  OwnerRelation,
  TimestampEntity,
  Entity,
} from '@webpackages/typeorm';
import { Project } from './project';

@Entity()
export class Sprint extends TimestampEntity implements ISprint<Project> {
  @NameColumn() sprintName!: string;
  @OwnerRelation(Project) project!: Project;
}
