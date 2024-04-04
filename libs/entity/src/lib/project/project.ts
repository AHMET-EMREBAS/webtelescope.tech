import { IProject } from '@webpackages/model';
import { StringColumn, TimestampEntity, Entity } from '@webpackages/typeorm';

@Entity()
export class Project extends TimestampEntity implements IProject {
  @StringColumn() projectName!: string;
}
