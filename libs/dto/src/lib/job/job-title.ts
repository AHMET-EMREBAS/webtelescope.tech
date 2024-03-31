import { ICreateJobTitleDto, IID } from '@webpackages/model';
import { Dto, NameProperty, ObjectIdProperty } from '@webpackages/property';

@Dto()
export class CreateJobTitleDto implements ICreateJobTitleDto {
  @NameProperty() title!: string;
  @ObjectIdProperty() industry!: IID;
}
