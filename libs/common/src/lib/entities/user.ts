import { IBasicEntity, IID, ITimestampEntity } from './base';
import { ICredential } from './credential';

export interface IPermission extends IBasicEntity {
  name: string;
}

export interface ICreatePermissionDto extends Pick<IPermission, 'name'> {}

export interface IUpdatePermissionDto extends Partial<ICreatePermissionDto> {}

export interface IRole<P> extends IBasicEntity {
  name: string;
  permissions: P[];
}

export interface ICreateRoleDto
  extends Pick<IRole<IID>, 'name' | 'permissions'> {}

export interface IUpdateRoleDto extends Partial<ICreateRoleDto> {}

export interface IUser<R> extends ITimestampEntity, ICredential {
  roles: R[];
}

export interface ICreateUserDto
  extends Pick<IUser<IID>, 'username' | 'password' | 'roles'> {}

export interface IUpdateUserDto extends Partial<ICreateUserDto> {}
