import { IProject } from '@webpackages/model';
import { NameColumn, TimestampEntity } from '../common';
import { Entity } from 'typeorm';

@Entity()
export class Project extends TimestampEntity implements IProject {
  @NameColumn() projectName!: string;
}
