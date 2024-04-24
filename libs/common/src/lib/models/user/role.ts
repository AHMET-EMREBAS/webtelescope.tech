import { IBaseModel, IID } from '../common';
import { IPermission } from './permission';

export interface IRole<Permission extends IID = IPermission>
  extends IBaseModel {
  name: string;
  permissions?: Permission[];
}

export interface IRoleView extends Pick<IRole, 'name'> {
  name: string;
  permissions?: string;
}

export interface ICreatePermissionDto extends Pick<IRole<IID>, 'name'> {}
export interface IUpdatePermissionDto extends Partial<ICreatePermissionDto> {}
export interface IQueryPermissionDto extends Pick<IRole<IID>, 'name'> {}
