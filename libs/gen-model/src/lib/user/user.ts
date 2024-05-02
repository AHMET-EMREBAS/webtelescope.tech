import { IID } from '@webpackages/common';
export interface IUser<TRole = IID, TUserDepartment = IID> {
  username: string;
  password: string;
  roles?: TRole[];
  userDepartment?: TUserDepartment;
}
