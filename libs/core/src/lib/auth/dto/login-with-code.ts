import { Dto, Property } from '../../decorators';
import { BaseDto } from './base.dto';

@Dto()
export class LoginWithCodeDto extends BaseDto<LoginWithCodeDto> {
  @Property({ type: 'string', format: 'email' })
  username!: string;

  @Property({ type: 'string', maxLength: 6, minLength: 6 })
  code!: string;
}
