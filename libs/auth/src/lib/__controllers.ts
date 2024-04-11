import { Type } from '@nestjs/common';
import {
  CreateAppDto,
  CreateLogDto,
  CreateMailDto,
  CreateOAuthDto,
  CreateOrgDto,
  CreatePermissionDto,
  CreateRoleDto,
  CreateScopeDto,
  CreateSecurityCodeDto,
  CreateSessionDto,
  CreateSubDto,
  CreateSubTypeDto,
  CreateUserDto,
  UpdateAppDto,
  UpdateLogDto,
  UpdateMailDto,
  UpdateOAuthDto,
  UpdateOrgDto,
  UpdatePermissionDto,
  UpdateRoleDto,
  UpdateScopeDto,
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
  Org,
  Mail,
  Sub,
  SubType,
  Log,
  App,
  Scope,
  OAuth,
} from '@webpackages/entity';
import { CreateController, ControllerConfiguration } from '@webpackages/rest';
import { NotDeleteGuard } from './guards/not-delete.guard';

function c(e: Type, c: Type, u: Type, config?: ControllerConfiguration) {
  return CreateController({ entity: e, createDto: c, updateDto: u }, config);
}

export const UserController = c(User, CreateUserDto, UpdateUserDto, {
  Delete: {
    guards: [NotDeleteGuard],
  },
});

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

export const OrganizationController = c(Org, CreateOrgDto, UpdateOrgDto);

export const MailController = c(Mail, CreateMailDto, UpdateMailDto);
export const SubController = c(Sub, CreateSubDto, UpdateSubDto);
export const SubTypeController = c(SubType, CreateSubTypeDto, UpdateSubTypeDto);
export const LogController = c(Log, CreateLogDto, UpdateLogDto);
export const AppController = c(App, CreateAppDto, UpdateAppDto);
export const ScopeController = c(Scope, CreateScopeDto, UpdateScopeDto);
export const OAuthController = c(OAuth, CreateOAuthDto, UpdateOAuthDto);

export const ResourceControllers = [
  AppController,
  ScopeController,
  OAuthController,
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
