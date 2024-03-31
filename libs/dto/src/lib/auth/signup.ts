import { IID, ISignupDto } from '@webpackages/model';
import {
  Dto,
  EmailProperty,
  NameProperty,
  ObjectIdProperty,
  PasswordProperty,
} from '@webpackages/property';

@Dto()
export class SignupDto implements ISignupDto {
  @EmailProperty() username!: string;
  @PasswordProperty() password!: string;
  @NameProperty() organizationName!: string;
  @ObjectIdProperty() subscription!: IID;
}
