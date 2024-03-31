import { ICreateTaskDto, IID, Range10 } from '@webpackages/model';
import {
  DateProperty,
  Dto,
  NameProperty,
  NumberProperty,
  ObjectIdProperty,
  OptionalTextProperty,
  RequiredTextProperty,
} from '@webpackages/property';

@Dto()
export class CreateTaskDto implements ICreateTaskDto {
  @NameProperty() taskTitle!: string;
  @OptionalTextProperty() taskDescription!: string;
  @RequiredTextProperty() status!: string;
  @ObjectIdProperty({ isArray: true }) tags!: IID[];
  @NumberProperty({ minimum: 1, maximum: 10 }) difficulty!: Range10;
  @NumberProperty({ minimum: 1, maximum: 10 }) priority!: Range10;
  @DateProperty() due!: Date;
  @ObjectIdProperty() sprint!: IID;
  @ObjectIdProperty({ isArray: true }) assignees!: IID[];
}
