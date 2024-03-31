import { ICreateExperience, IID } from '@webpackages/model';
import { DateProperty, Dto, ObjectIdProperty } from '@webpackages/property';

@Dto()
export class CreateExperienceDto implements ICreateExperience {
  @DateProperty() startDate!: Date;
  @DateProperty() endDate!: Date;
  @ObjectIdProperty() jobTitle!: IID;
  @ObjectIdProperty() company!: IID;
}
