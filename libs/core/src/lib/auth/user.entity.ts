import { Entity } from 'typeorm';
import { BaseNameEntity, BaseUserEntity, Relation } from '../entity';
import { Exclude } from 'class-transformer';
import { Property } from '../validation';
import { PartialType, PickType } from '@nestjs/swagger';

@Entity()
export class Permission extends BaseNameEntity {}

@Entity()
export class Role extends BaseNameEntity {
  @Relation({ type: 'subs', target: Permission })
  permissions?: Permission[];
}

@Entity()
export class User extends BaseUserEntity {
  @Relation({ type: 'subs', target: Role })
  roles?: Role[];
}

@Exclude()
export class CreateUserDto {
  @Property({ type: 'string', format: 'email' })
  username!: string;

  @Property({ type: 'string', format: 'password' })
  password!: string;
}

@Exclude()
export class UpdateUserDto extends PickType(CreateUserDto, ['password']) {}

@Exclude()
export class CreatePermissionDto {
  @Property({ type: 'string', minLength: 3, maxLength: 50 })
  name?: string;
}

@Exclude()
export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {}

@Exclude()
export class CreateRoleDto {
  @Property({ type: 'string', minLength: 3, maxLength: 50 })
  name?: string;
}

@Exclude()
export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
