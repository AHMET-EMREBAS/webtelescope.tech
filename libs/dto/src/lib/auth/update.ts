import { PartialType } from '@nestjs/swagger';
import { Dto } from '@webpackages/property';
import { CreateSessionDto } from './session';
import { CreateOrganizationDto } from './organization';
import { CreateRoleDto } from './role';
import { CreateSubscriptionDto } from './subscription';
import { CreatePermissionDto } from './permission';

@Dto()
export class UpdateSessionDto extends PartialType(CreateSessionDto) {}
@Dto()
export class UpdateOrganizationDto extends PartialType(CreateOrganizationDto) {}
@Dto()
export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
@Dto()
export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {}
@Dto()
export class UpdateSubscriptionDto extends PartialType(CreateSubscriptionDto) {}
