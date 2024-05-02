import { IID } from '@webpackages/common';
export interface IUser<TRole, TDepartment> {
  username: string;
  password: string;
  role?: TRole[];
  department?: TDepartment[];
}
