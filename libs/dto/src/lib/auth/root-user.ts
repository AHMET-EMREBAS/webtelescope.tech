import { ICreateRootUserDto } from '@webpackages/model';
import { Dto, PasswordProperty, StringProperty } from '@webpackages/property';

@Dto()
export class CreateRootUserDto implements ICreateRootUserDto {
  @StringProperty() username!: string;
  @PasswordProperty() password!: string;
}
