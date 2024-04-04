import { ICreateAccomplishementDto, IID } from '@webpackages/model';
import { Dto, ObjectIdProperty, StringProperty } from '@webpackages/property';

@Dto()
export class CreateAccomplishmentDto implements ICreateAccomplishementDto {
  @ObjectIdProperty() jobTitle!: IID;
  @StringProperty() description!: string;
}
