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

export interface IUserView {
  username: string;
  password: string;
  roles?: string;
  permissions?: string;
  scopes?: string;
}

export interface ICreateUserDto
  extends Pick<IUser<IID, IID>, 'username' | 'password' | 'roles' | 'scopes'> {}

export interface IUpdateUserDto extends Partial<ICreateUserDto> {}

export interface IQueryUserDto
  extends Pick<IUserView, 'username' | 'roles' | 'permissions' | 'scopes'> {}
