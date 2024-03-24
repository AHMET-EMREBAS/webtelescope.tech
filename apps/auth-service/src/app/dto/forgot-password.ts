import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ForgotPassword {
  @ApiProperty({
    type: 'string',
    format: 'email',
    example: 'username@domain.com',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  username: string;
}
