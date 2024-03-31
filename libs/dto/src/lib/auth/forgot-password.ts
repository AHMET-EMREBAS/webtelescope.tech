import { IForgotPasswordDto } from '@webpackages/model';
import { Dto, EmailProperty } from '@webpackages/property';

@Dto()
export class ForgotPasswordDto implements IForgotPasswordDto {
  @EmailProperty() username!: string;
}
