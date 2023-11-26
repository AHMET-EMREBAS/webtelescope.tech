import { PermissionModel } from '@webpackages/common';
import { BaseEntity } from './base';
import { Column, Entity } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Permission extends BaseEntity implements PermissionModel {
  @Column({ type: 'string', unique: true })
  name!: string;
}

@Exclude()
export class CreatePermissionDto implements Pick<PermissionModel, 'name'> {
  @Expose()
  @ApiProperty({ type: 'string', minLength: 3, maxLength: 50 })
  name!: string;
}

@Exclude()
export class UpdatePermissionDto extends CreatePermissionDto {}
