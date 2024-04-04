import { IForgotPasswordDto } from '@webpackages/model';
import { Dto, EmailProperty } from '@webpackages/property';

/**
 * @param username {@link username}
 */
@Dto()
export class ForgotPasswordDto implements IForgotPasswordDto {
  @EmailProperty() username!: string;
}
