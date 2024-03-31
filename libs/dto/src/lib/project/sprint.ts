import { ICrateSprintDto, IID } from '@webpackages/model';
import { Dto, NameProperty, ObjectIdProperty } from '@webpackages/property';

@Dto()
export class CreateSprintDto implements ICrateSprintDto {
  @ObjectIdProperty() project!: IID;
  @NameProperty() sprintName!: string;
}
