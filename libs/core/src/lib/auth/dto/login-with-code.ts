import { Dto, Property } from '../../decorators';

@Dto()
export class LoginWithCodeDto {
  @Property({ type: 'string', format: 'email' })
  username!: string;

  @Property({ type: 'string', maxLength: 6, minLength: 6 })
  code!: string;
}
