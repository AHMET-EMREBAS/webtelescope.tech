import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail } from 'class-validator';

@Exclude()
export class ForgotPasswordDto {
  @Expose()
  @ApiProperty({ type: 'string', format: 'email', default: 'root@root.com' })
  @IsEmail()
  username!: string;
}
