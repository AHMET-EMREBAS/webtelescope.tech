/* eslint-disable @typescript-eslint/no-unused-vars */
import { UnprocessableEntityException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { IsEmail, IsStrongPassword } from 'class-validator';

@Exclude()
export class ResetPasswordDto {
  @Expose()
  @ApiProperty({ type: 'string', format: 'email' })
  @IsEmail()
  username!: string;

  @Expose()
  @ApiProperty({ type: 'string', format: 'password' })
  @IsStrongPassword()
  currentPassword!: string;

  @Expose()
  @ApiProperty({ type: 'string', format: 'password' })
  @IsStrongPassword()
  password!: string;

  @Expose()
  @ApiProperty({ type: 'string', format: 'password' })
  @IsStrongPassword()
  @Transform(({ value, obj }) => {
    if (value) {
      if (value === obj.value) {
        return value;
      }
      throw new UnprocessableEntityException(`Passwords do not match!`);
    }
    return value;
  })
  confirmPassword!: string;
}
