import { Dto, Property } from '../../decorators';

@Dto()
export class SignupDto {
  @Property({ type: 'string', required: true, format: 'email' })
  username!: string;
}
