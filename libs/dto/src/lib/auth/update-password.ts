import { IUpdatePasswordDto } from '@webpackages/model';
import {
  Dto,
  EmailProperty,
  PasswordProperty,
  StringProperty,
} from '@webpackages/property';

@Dto()
export class UpdatePasswordDto implements IUpdatePasswordDto {
  @EmailProperty() username!: string;
  @StringProperty() password!: string;
  @PasswordProperty() newPassword!: string;
}
