import { IBaseModel, IID } from '../common';
import { IPermission } from './permission';
import { IRole } from './role';
import { IScope } from './scope';

export interface IUser<
  Role extends IID = IRole<IPermission>,
  Scope extends IID = IScope
> extends IBaseModel {
  username: string;
  password: string;
  roles?: Role[];
  scopes?: Scope[];
}
export interface IUserBasicView extends Pick<IUser, 'id' | 'username'> {}

export interface IUserRoleView extends IUserBasicView {
  roles?: string;
  permissions?: string;
}

export interface IUserScopeView extends IUserBasicView {
  scopes?: string;
}

export interface IUserView extends IUserRoleView, IUserScopeView {}

export interface ICreateUserDto
  extends Pick<IUser<IID, IID>, 'username' | 'password' | 'roles' | 'scopes'> {}

export interface IUpdateUserDto extends Partial<ICreateUserDto> {}

export interface IQueryUserDto
  extends Pick<
    IUserView,
    'id' | 'username' | 'permissions' | 'roles' | 'scopes'
  > {}
