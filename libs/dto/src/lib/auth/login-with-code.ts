import { ILoginWithCodeDto } from '@webpackages/model';
import { Dto, EmailProperty, ShortTextProperty } from '@webpackages/property';

@Dto()
export class LoginWithCodeDto implements ILoginWithCodeDto {
  @ShortTextProperty() securityCode!: string;
  @EmailProperty() username!: string;
}
