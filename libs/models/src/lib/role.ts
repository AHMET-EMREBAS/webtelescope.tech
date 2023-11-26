import { BaseModel, IDModel, RoleModel } from '@webpackages/common';
import { BaseEntity, IDDto } from './base';
import { Permission } from './permission';
import { Column, Entity, JoinColumn, ManyToMany } from 'typeorm';
import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { MinLength, ValidateNested } from 'class-validator';

@Entity()
export class Role extends BaseEntity implements BaseModel {
  @Column({ type: 'varchar', unique: true })
  name!: string;

  @ManyToMany(() => Permission, (p) => p.id, { eager: true })
  @JoinColumn()
  permissions!: Permission[];
}

@Exclude()
export class CreateRoleDto
  implements Pick<RoleModel<IDModel>, 'name' | 'permissions'>
{
  @Expose()
  @ApiProperty({ type: 'string', minLength: 3, maxLength: 50 })
  @MinLength(3)
  name!: string;

  @Expose()
  @ApiProperty({ type: 'object' })
  @ValidateNested({ each: true })
  @Type(() => IDDto)
  permissions!: IDDto[];
}

@Exclude()
export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
