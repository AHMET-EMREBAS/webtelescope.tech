import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsStrongPassword } from 'class-validator';

@Exclude()
export class LoginDto {
  @Expose()
  @ApiProperty({ type: 'string', format: 'email', default: 'root@root.com' })
  @IsEmail()
  username!: string;

  @Expose()
  @ApiProperty({ type: 'string', format: 'password', default: 'Pass123!' })
  @IsStrongPassword()
  password!: string;
}
