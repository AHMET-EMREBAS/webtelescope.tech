import { IAccessTokenDto } from '@webpackages/model';
import { Dto, JwtProperty } from '@webpackages/property';

/**
 * @param accessToken {@link accessToken}
 */
@Dto()
export class AccessTokenDto implements IAccessTokenDto {
  @JwtProperty()
  accessToken!: string;
}
