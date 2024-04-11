import { ILoginResultDto } from '@webpackages/model';
import { Dto, JwtProperty, StringProperty } from '@webpackages/property';

/**
 * @param accessToken {@link accessToken}
 * @param deviceId {@link deviceId}
 */
@Dto()
export class LoginResult implements ILoginResultDto {
  @JwtProperty() accessToken!: string;
  @StringProperty({ description: 'Device id' }) deviceId!: string;
}

@Dto()
export class LogoutResult {
  @StringProperty({ example: 'We are deleting your current session.' })
  message!: string;
}
