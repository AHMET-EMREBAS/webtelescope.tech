import { ISprint } from '@webpackages/model';
import { NameColumn, OwnerRelation, TimestampEntity } from '../common';
import { Project } from './project';
import { Entity } from 'typeorm';

@Entity()
export class Sprint extends TimestampEntity implements ISprint<Project> {
  @NameColumn() sprintName!: string;
  @OwnerRelation(Project) project!: Project;
}
