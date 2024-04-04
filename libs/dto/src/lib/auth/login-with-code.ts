import { ILoginWithCodeDto } from '@webpackages/model';
import { Dto, EmailProperty, UUID4Property } from '@webpackages/property';

/**
 * @param username {@link username}
 * @param securityCode {@link securityCode}
 */
@Dto()
export class LoginWithCodeDto implements ILoginWithCodeDto {
  @UUID4Property() securityCode!: string;
  @EmailProperty() username!: string;
}
