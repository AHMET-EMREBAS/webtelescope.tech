import { Property } from '@webpackages/core';
import { Exclude } from 'class-transformer';

@Exclude()
export class CreateRoleDto {
  @Property({ type: 'string', required: true }) name!: string;
}
