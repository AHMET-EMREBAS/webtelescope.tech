import { Dto, Property } from '../../decorators';

@Dto()
export class LoginDto {
  @Property({
    type: 'string',
    format: 'email',
    required: true,
    default: 'root@root.com',
  })
  username!: string;

  @Property({ type: 'string', required: true, default: 'Pass123!' })
  password!: string;
}
