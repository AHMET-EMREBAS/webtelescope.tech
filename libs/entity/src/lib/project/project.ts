import { IProject } from '@webpackages/model';
import { NameColumn, TimestampEntity, Entity } from '@webpackages/typeorm';

@Entity()
export class Project extends TimestampEntity implements IProject {
  @NameColumn() projectName!: string;
}
