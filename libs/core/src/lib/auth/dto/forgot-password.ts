import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

@Exclude()
export class ForgotPasswordDto {
  @ApiProperty({ type: 'string', example: 'root@webtelescope.tech' })
  @IsEmail()
  @IsNotEmpty()
  @Expose()
  username!: string;
}
