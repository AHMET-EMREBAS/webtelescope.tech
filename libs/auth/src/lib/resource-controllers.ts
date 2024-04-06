import { CanActivate, Type } from '@nestjs/common';
import {
  CreateLogDto,
  CreateMailDto,
  CreateOrganizationDto,
  CreatePermissionDto,
  CreateRoleDto,
  CreateRootUserDto,
  CreateSecurityCodeDto,
  CreateSessionDto,
  CreateSubDto,
  CreateSubTypeDto,
  CreateUserDto,
  UpdateLogDto,
  UpdateMailDto,
  UpdateOrganizationDto,
  UpdatePermissionDto,
  UpdateRoleDto,
  UpdateRootUserDto,
  UpdateSecurityCodeDto,
  UpdateSessionDto,
  UpdateSubDto,
  UpdateSubTypeDto,
  UpdateUserDto,
} from '@webpackages/dto';
import {
  User,
  Role,
  Permission,
  Session,
  SecurityCode,
  Organization,
  RootUser,
  Mail,
  Sub,
  SubType,
  Log,
} from '@webpackages/entity';
import { CreateController } from '@webpackages/rest';
import { NotDeleteGuard } from './not-delete.guard';

function c(e: Type, c: Type, u: Type, guards: Type<CanActivate>[] = []) {
  return CreateController({ entity: e, createDto: c, updateDto: u, guards });
}

export const UserController = c(User, CreateUserDto, UpdateUserDto, [
  NotDeleteGuard,
]);

export const RoleController = c(Role, CreateRoleDto, UpdateRoleDto);

export const PermissionController = c(
  Permission,
  CreatePermissionDto,
  UpdatePermissionDto
);

export const SessionController = c(Session, CreateSessionDto, UpdateSessionDto);

export const SecurityCodeController = c(
  SecurityCode,
  CreateSecurityCodeDto,
  UpdateSecurityCodeDto
);

export const OrganizationController = c(
  Organization,
  CreateOrganizationDto,
  UpdateOrganizationDto
);

export const RootUserController = c(
  RootUser,
  CreateRootUserDto,
  UpdateRootUserDto
);

export const MailController = c(Mail, CreateMailDto, UpdateMailDto);

export const SubController = c(Sub, CreateSubDto, UpdateSubDto);

export const SubTypeController = c(SubType, CreateSubTypeDto, UpdateSubTypeDto);

export const LogController = c(Log, CreateLogDto, UpdateLogDto);

export const AuthResourceControllers = [
  UserController,
  RoleController,
  PermissionController,
  SessionController,
  SecurityCodeController,
  SubController,
  SubTypeController,
  OrganizationController,
  MailController,
  LogController,
];
