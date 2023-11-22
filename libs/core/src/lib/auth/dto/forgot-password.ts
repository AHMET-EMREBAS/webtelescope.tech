import { Dto, Property } from '../../decorators';

@Dto()
export class ForgotPasswordDto {
  @Property({ type: 'string', format: 'email' })
  username!: string;
}
