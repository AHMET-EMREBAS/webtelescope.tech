import {
  IDModel,
  PermissionModel,
  RoleModel,
  UserModel,
} from '@webpackages/common';
import { BaseEntity, IDDto } from './base';
import { Role } from './role';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword, ValidateNested } from 'class-validator';

@Entity()
export class User
  extends BaseEntity
  implements UserModel<RoleModel<PermissionModel>>
{
  @Column({ type: 'varchar', unique: true })
  username!: string;

  @Column({ type: 'varchar' })
  password!: string;

  @ManyToMany(() => Role, (r) => r.id, { eager: true })
  @JoinTable()
  roles!: Role[];
}

@Exclude()
export class CreateUserDto
  implements Pick<UserModel<IDModel>, 'username' | 'password' | 'roles'>
{
  @Expose()
  @ApiProperty({ type: 'string', format: 'email' })
  @IsEmail()
  username!: string;

  @Expose()
  @ApiProperty({ type: 'string', format: 'password' })
  @IsStrongPassword()
  password!: string;

  @Expose()
  @ApiProperty({ type: 'object' })
  @ValidateNested({ each: true })
  @Type(() => IDDto)
  roles!: IDDto[];
}

@Exclude()
export class UpdateUserDto extends PartialType(CreateUserDto) {}
