import { PartialType } from '@nestjs/swagger';
import { Dto } from '@webpackages/property';
import { CreateSessionDto } from './session';
import { CreateOrganizationDto } from './organization';
import { CreateRoleDto } from './role';
import { CreateSubTypeDto } from './sub-type';
import { CreatePermissionDto } from './permission';
import { CreateUserDto } from './user';
import { CreateSecurityCodeDto } from './security-code';
import { CreateSubDto } from './sub';
import { CreateRootUserDto } from './root-user';

@Dto()
export class UpdateSessionDto extends PartialType(CreateSessionDto) {}
@Dto()
export class UpdateOrganizationDto extends PartialType(CreateOrganizationDto) {}
@Dto()
export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
@Dto()
export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {}
@Dto()
export class UpdateSubTypeDto extends PartialType(CreateSubTypeDto) {}
@Dto()
export class UpdateUserDto extends PartialType(CreateUserDto) {}
@Dto()
export class UpdateSecurityCodeDto extends PartialType(CreateSecurityCodeDto) {}
@Dto()
export class UpdateSubDto extends PartialType(CreateSubDto) {}
@Dto()
export class UpdateRootUserDto extends PartialType(CreateRootUserDto) {}
