import { ILoginDto } from '@webpackages/model';
import { Dto, EmailProperty, PasswordProperty } from '@webpackages/property';

/**
 * @param username {@link username}
 * @param password {@link password}
 */
@Dto()
export class LoginDto implements ILoginDto {
  @EmailProperty() username!: string;
  @PasswordProperty() password!: string;
}
