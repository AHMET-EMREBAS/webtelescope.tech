import { ICreateQuestionDto, IID } from '@webpackages/model';
import {
  Dto,
  ObjectIdProperty,
  RequiredTextProperty,
} from '@webpackages/property';

@Dto()
export class CreateQuestionDto implements ICreateQuestionDto {
  @RequiredTextProperty() question!: string;
  @ObjectIdProperty() user!: IID;
}
