import { ApiProperty } from '@nestjs/swagger';
import { ID } from '@webpackages/core';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsEmail, IsStrongPassword, ValidateNested } from 'class-validator';
import { Role } from '../../role';

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

  @ApiProperty({ type: 'object' })
  @ValidateNested()
  @Type(() => ID)
  roles!: Role[];
}
