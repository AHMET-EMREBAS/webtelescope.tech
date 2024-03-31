import { ICreateAccomplishementDto, IID } from '@webpackages/model';
import {
  Dto,
  ObjectIdProperty,
  RequiredTextProperty,
} from '@webpackages/property';

@Dto()
export class CreateAccomplishmentDto implements ICreateAccomplishementDto {
  @ObjectIdProperty() jobTitle!: IID;
  @RequiredTextProperty() description!: string;
}
