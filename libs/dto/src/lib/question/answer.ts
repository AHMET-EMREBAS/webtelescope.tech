import { ICreateAnswerDto, IID } from '@webpackages/model';
import { Dto, ObjectIdProperty, StringProperty } from '@webpackages/property';

@Dto()
export class CreateAnswerDto implements ICreateAnswerDto {
  @ObjectIdProperty() question!: IID;
  @ObjectIdProperty() user!: IID;
  @StringProperty() answer!: string;
}
