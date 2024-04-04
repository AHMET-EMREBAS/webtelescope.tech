import { ICreateQuestionDto, IID } from '@webpackages/model';
import { Dto, ObjectIdProperty, StringProperty } from '@webpackages/property';

@Dto()
export class CreateQuestionDto implements ICreateQuestionDto {
  @StringProperty() question!: string;
  @ObjectIdProperty() user!: IID;
}
