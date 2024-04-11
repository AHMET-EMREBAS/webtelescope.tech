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
import { CreateController } from '@webpackages/rest';
import { NotDeleteGuard } from './guards/not-delete.guard';
import { BearerAccess } from './app.guard';
import {
  ControllerConfiguration,
  IRestResourceBuilder,
} from '@webpackages/core';

function create(
  entity: Type,
  createDto: Type,
  updateDto: Type,
  config?: ControllerConfiguration<IRestResourceBuilder>
) {
  return CreateController(
    { entity, createDto, updateDto },
    {
      Controller: {
        ...config?.Controller,
        decorators: [BearerAccess(), ...(config?.Controller?.decorators || [])],
      },
      ...config,
    }
  );
}

export const UserController = create(User, CreateUserDto, UpdateUserDto, {
  Delete: {
    guards: [NotDeleteGuard],
  },
});

export const RoleController = create(Role, CreateRoleDto, UpdateRoleDto);

export const PermissionController = create(
  Permission,
  CreatePermissionDto,
  UpdatePermissionDto
);

export const SessionController = create(
  Session,
  CreateSessionDto,
  UpdateSessionDto
);

export const SecurityCodeController = create(
  SecurityCode,
  CreateSecurityCodeDto,
  UpdateSecurityCodeDto
);

export const OrganizationController = create(Org, CreateOrgDto, UpdateOrgDto);

export const MailController = create(Mail, CreateMailDto, UpdateMailDto);
export const SubController = create(Sub, CreateSubDto, UpdateSubDto);
export const SubTypeController = create(
  SubType,
  CreateSubTypeDto,
  UpdateSubTypeDto
);
export const LogController = create(Log, CreateLogDto, UpdateLogDto);
export const AppController = create(App, CreateAppDto, UpdateAppDto);
export const ScopeController = create(Scope, CreateScopeDto, UpdateScopeDto);
export const OAuthController = create(OAuth, CreateOAuthDto, UpdateOAuthDto);

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
