/* eslint-disable @typescript-eslint/no-unused-vars */
import { UnprocessableEntityException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import {
  IsEmail,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

@Exclude()
export class ResetPasswordWithCodeDto {
  @Expose()
  @ApiProperty({ type: 'string', format: 'email', default: 'root@root.com' })
  @IsEmail()
  username!: string;

  @Expose()
  @ApiProperty({ type: 'string', minLength: 4, maxLength: 10 })
  @MinLength(4)
  @MaxLength(10)
  securityCode!: string;

  @Expose()
  @ApiProperty({ type: 'string', format: 'password', default: 'Pass1234!' })
  @IsStrongPassword()
  password!: string;

  @Expose()
  @ApiProperty({ type: 'string', format: 'password', default: 'Pass1234!' })
  @IsStrongPassword()
  @Transform(({ value, obj }) => {
    if (value) {
      if (value === obj.password) {
        return value;
      }
      throw new UnprocessableEntityException(`Passwords do not match!`);
    }
    return value;
  })
  confirmPassword!: string;
}
