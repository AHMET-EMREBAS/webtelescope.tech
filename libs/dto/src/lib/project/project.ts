import { ICreateProjectDto } from '@webpackages/model';
import { Dto, NameProperty } from '@webpackages/property';

@Dto()
export class CreateProjectDto implements ICreateProjectDto {
  @NameProperty() projectName!: string;
}
