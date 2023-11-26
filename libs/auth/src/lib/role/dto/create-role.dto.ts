import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { IDDto } from '@webpackages/rest';
import { Permission } from '../../permission';

@Exclude()
export class CreateRoleDto {
  @ApiProperty({ type: 'string' })
  @Expose()
  name!: string;

  @ApiProperty({ type: 'object' })
  @ValidateNested()
  @Type(() => IDDto)
  permissions!: Permission[];
}
