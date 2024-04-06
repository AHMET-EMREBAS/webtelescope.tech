import { IAccessTokenDto } from '@webpackages/model';
import { Dto, JwtProperty, StringProperty } from '@webpackages/property';

/**
 * @param accessToken {@link accessToken}
 */
@Dto()
export class LoginResult implements IAccessTokenDto {
  @JwtProperty() accessToken!: string;
  @StringProperty({ description: 'Device id' }) deviceId!: string;
}
