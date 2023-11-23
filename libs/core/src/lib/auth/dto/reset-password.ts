import { Transform } from 'class-transformer';
import { Dto, Property } from '../../decorators';
import { UnprocessableEntityException } from '@nestjs/common';
import { BaseDto } from './base.dto';

@Dto()
export class ResetPasswordDto extends BaseDto<ResetPasswordDto> {
  @Property({ type: 'string', required: true, format: 'email' })
  username!: string;

  @Property({ type: 'string', required: true, format: 'password' })
  password!: string;

  @Property({ type: 'string', required: true })
  @Transform(({ obj, value }) => {
    if (obj.password === value) return value;

    throw new UnprocessableEntityException('Password does not match!');
  })
  confirmPassword!: string;
}
