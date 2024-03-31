import { IUpdatePasswordDto } from '@webpackages/model';
import {
  Dto,
  EmailProperty,
  PasswordProperty,
  ShortTextProperty,
} from '@webpackages/property';

@Dto()
export class UpdatePasswordDto implements IUpdatePasswordDto {
  @EmailProperty() username!: string;
  @ShortTextProperty() password!: string;
  @PasswordProperty() newPassword!: string;
}
