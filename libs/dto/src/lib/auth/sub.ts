import { IID, ICreateSubDto } from '@webpackages/model';
import {
  Dto,
  EmailProperty,
  NameProperty,
  ObjectIdProperty,
  PasswordProperty,
} from '@webpackages/property';

@Dto()
export class CreateSubDto implements ICreateSubDto {
  @EmailProperty() username!: string;
  @PasswordProperty() password!: string;
  @NameProperty() organizationName!: string;
  @ObjectIdProperty() subscription!: IID;
}
