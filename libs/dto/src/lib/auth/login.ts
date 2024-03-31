import { ILoginDto } from '@webpackages/model';
import { Dto, EmailProperty, PasswordProperty } from '@webpackages/property';

/**
 * @param username string
 * @param password string
 */
@Dto()
export class LoginDto implements ILoginDto {
  @EmailProperty() username!: string;
  @PasswordProperty() password!: string;
}
