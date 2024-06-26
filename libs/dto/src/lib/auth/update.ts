import { PartialType, PickType } from '@nestjs/swagger';
import { Dto } from '@webpackages/property';
import { CreateSessionDto } from './session';
import { CreateOrgDto } from './org';
import { CreateRoleDto } from './role';
import { CreateSubTypeDto } from './sub-type';
import { CreatePermissionDto } from './permission';
import { CreateUserDto } from './user';
import { CreateSecurityCodeDto } from './security-code';
import { CreateSubDto } from './sub';

@Dto()
export class NotUpdateDto {}

@Dto()
export class UpdateSessionDto extends PartialType(CreateSessionDto) {}

@Dto()
export class UpdateOrgDto extends PartialType(PickType(CreateOrgDto, [])) {}

@Dto()
export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
@Dto()
export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {}
@Dto()
export class UpdateSubTypeDto extends PartialType(CreateSubTypeDto) {}

@Dto()
export class UpdateUserDto extends PartialType(
  PickType(CreateUserDto, ['password'])
) {}

@Dto()
export class UpdateSecurityCodeDto extends PartialType(CreateSecurityCodeDto) {}

@Dto()
export class UpdateSubDto extends PartialType(CreateSubDto) {}
