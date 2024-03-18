import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

@Exclude()
export class LoginDto {
  @ApiProperty({ type: 'string', example: 'root@webtelescope.tech' })
  @IsEmail()
  @IsNotEmpty()
  @Expose()
  username!: string;

  @ApiProperty({ type: 'string', example: '!Password1' })
  @IsStrongPassword()
  @IsNotEmpty()
  @Expose()
  password!: string;
}
