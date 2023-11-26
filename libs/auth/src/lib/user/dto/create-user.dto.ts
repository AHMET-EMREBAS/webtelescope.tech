import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsStrongPassword } from 'class-validator';

@Exclude()
export class CreateUserDto {
  @ApiProperty({ type: 'string', format: 'email' })
  @IsEmail()
  @Expose()
  username!: string;

  @ApiProperty({ type: 'string', format: 'password' })
  @IsStrongPassword()
  @Expose()
  password!: string;
}
