import { IID } from '@webpackages/common';
export interface IUserView extends IID {
  username: string;
  roleName: string;
  roleDescription: string;
  userDepartmentName: string;
}
