import {
  EntityCollectionServiceElementsFactory,
  EntityDataModuleConfig,
} from '@ngrx/data';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EntityCollectionService } from '../common';
import {
  IID,
  IOrg,
  IPermission,
  IRole,
  ISession,
  ISub,
  ISubType,
  IUser,
} from '@webpackages/model';

export const AuthEntityDataModuleConfig: EntityDataModuleConfig = {
  pluralNames: {
    User: 'Users',
    Role: 'Roles',
    
    Permission: 'Permissions',
    Session: 'Sessions',
    Organization: 'Organizations',
    Sub: 'Subs',
    SubType: 'SubTypes',
  },
  entityMetadata: {
    User: {},
    Permission: {},
    Role: {},
    Session: {},
    Organization: {},
    Sub: {},
    SubType: {},
  },
};

@Injectable()
export class UserService extends EntityCollectionService<IUser<IID, IID>> {
  constructor(
    factory: EntityCollectionServiceElementsFactory,
    httpClient: HttpClient
  ) {
    super('User', factory, httpClient);
  }
}

@Injectable()
export class RoleService extends EntityCollectionService<IRole<IID>> {
  constructor(
    factory: EntityCollectionServiceElementsFactory,
    httpClient: HttpClient
  ) {
    super('Role', factory, httpClient);
  }
}

@Injectable()
export class PermissionService extends EntityCollectionService<IPermission> {
  constructor(
    factory: EntityCollectionServiceElementsFactory,
    httpClient: HttpClient
  ) {
    super('Permission', factory, httpClient);
  }
}
@Injectable()
export class SessionService extends EntityCollectionService<ISession> {
  constructor(
    factory: EntityCollectionServiceElementsFactory,
    httpClient: HttpClient
  ) {
    super('Session', factory, httpClient);
  }
}
@Injectable()
export class OrganizationService extends EntityCollectionService<IOrg> {
  constructor(
    factory: EntityCollectionServiceElementsFactory,
    httpClient: HttpClient
  ) {
    super('Organization', factory, httpClient);
  }
}

@Injectable()
export class SubService extends EntityCollectionService<ISub<IID>> {
  constructor(
    factory: EntityCollectionServiceElementsFactory,
    httpClient: HttpClient
  ) {
    super('Sub', factory, httpClient);
  }
}

@Injectable()
export class SubTypeService extends EntityCollectionService<ISubType> {
  constructor(
    factory: EntityCollectionServiceElementsFactory,
    httpClient: HttpClient
  ) {
    super('SubType', factory, httpClient);
  }
}
