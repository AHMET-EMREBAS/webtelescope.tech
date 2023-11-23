import { Dto, Property } from '../../decorators';
import { BaseDto } from './base.dto';

@Dto()
export class ForgotPasswordDto extends BaseDto<ForgotPasswordDto> {
  @Property({ type: 'string', format: 'email' })
  username!: string;
}
