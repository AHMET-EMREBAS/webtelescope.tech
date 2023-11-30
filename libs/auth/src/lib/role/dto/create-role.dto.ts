import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ID } from '@webpackages/core';
import { Permission } from '../../permission';

@Exclude()
export class CreateRoleDto {
  @ApiProperty({ type: 'string' })
  @Expose()
  name!: string;

  @ApiProperty({ type: 'object' })
  @ValidateNested()
  @Type(() => ID)
  permissions!: Permission[];
}
