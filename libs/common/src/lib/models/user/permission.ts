import { IBaseModel } from '../common';

export interface IPermission extends IBaseModel {
  name: string;
}

export interface ICreatePermission extends Pick<IPermission, 'name'> {}

export interface IUpdatePermission extends Partial<ICreatePermission> {}

export interface IQueryPermission extends Partial<Pick<IPermission, 'name'>> {}
