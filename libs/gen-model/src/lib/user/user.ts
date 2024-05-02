import { IID } from '@webpackages/common';
export interface IUser {
  username: string;
  password: string;
  roles?: TRole[];
  department?: TDepartment[];
}
