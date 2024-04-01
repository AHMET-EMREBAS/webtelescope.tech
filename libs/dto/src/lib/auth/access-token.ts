import { IAccessTokenDto } from '@webpackages/model';
import { Dto, LongTextProperty } from '@webpackages/property';

/**
 * @param accessToken {@link accessToken}
 */
@Dto()
export class AccessTokenDto implements IAccessTokenDto {
  @LongTextProperty()
  accessToken!: string;
}
