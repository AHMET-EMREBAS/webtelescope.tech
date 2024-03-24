import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

@Exclude()
export class LoginWithCode {
  @ApiProperty({ type: 'string', format: 'email', required: true })
  @Expose()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    type: 'string',
    format: 'uuid',
    required: true,
    description: 'Generated code upon forgot-password request.',
  })
  @Expose()
  @IsNotEmpty()
  code: string;
}
