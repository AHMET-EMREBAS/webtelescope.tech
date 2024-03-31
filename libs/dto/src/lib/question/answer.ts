import { ICreateAnswerDto, IID } from '@webpackages/model';
import {
  Dto,
  ObjectIdProperty,
  RequiredTextProperty,
} from '@webpackages/property';

@Dto()
export class CreateAnswerDto implements ICreateAnswerDto {
  @ObjectIdProperty() question!: IID;
  @ObjectIdProperty() user!: IID;
  @RequiredTextProperty() answer!: string;
}
