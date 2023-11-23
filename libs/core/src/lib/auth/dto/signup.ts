import { Dto, Property } from '../../decorators';
import { BaseDto } from './base.dto';

@Dto()
export class SignupDto extends BaseDto<SignupDto> {
  @Property({ type: 'string', required: true, format: 'email' })
  username!: string;

  @Property({ type: 'string', required: true, format: 'password' })
  password!: string;
}
