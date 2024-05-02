import { IID } from '@webpackages/common';
export interface IUser<TRole, TUserDepartment> {
  username: string;
  password: string;
  roles?: TRole[];
  userDepartment?: TUserDepartment;
}
