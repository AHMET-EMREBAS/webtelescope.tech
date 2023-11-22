import { Dto, Property } from '../../decorators';

@Dto()
export class LoginDto {
  @Property({ type: 'string', format: 'email', required: true })
  username!: string;

  @Property({ type: 'string', required: true })
  password!: string;
  
}
