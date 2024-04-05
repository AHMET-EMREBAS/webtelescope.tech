import { ICreateMailDto } from '@webpackages/model';
import {
  BooleanProperty,
  Dto,
  EmailProperty,
  StringProperty,
} from '@webpackages/property';

@Dto()
export class CreateMailDto implements ICreateMailDto {
  @EmailProperty() to!: string;
  @EmailProperty() from!: string;
  @StringProperty() subject!: string;
  @StringProperty() message!: string;
  @BooleanProperty() sent!: boolean;
}
