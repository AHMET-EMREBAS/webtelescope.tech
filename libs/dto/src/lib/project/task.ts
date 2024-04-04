import { ICreateTaskDto, IID, Range10 } from '@webpackages/model';
import {
  DateProperty,
  Dto,
  NameProperty,
  ObjectIdProperty,
  StringProperty,
  TenProperty,
} from '@webpackages/property';

@Dto()
export class CreateTaskDto implements ICreateTaskDto {
  @NameProperty() taskTitle!: string;
  @StringProperty({ required: false }) taskDescription!: string;
  @StringProperty() status!: string;
  @ObjectIdProperty({ isArray: true }) tags!: IID[];
  @TenProperty() difficulty!: Range10;
  @TenProperty() priority!: Range10;
  @DateProperty() due!: Date;
  @ObjectIdProperty() sprint!: IID;
  @ObjectIdProperty({ isArray: true }) assignees!: IID[];
}
