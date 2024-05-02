import { IID } from '@webpackages/common';
export interface IUser<TRole, TDepartment> {
  username: string;
  password: string;
  roles?: TRole[];
  department?: TDepartment;
}
