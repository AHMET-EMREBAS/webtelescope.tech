import { IID } from '@webpackages/common';
export interface IUpdateUserDto {
  username?: string;
  password?: string;
  roles?: IID[];
  department?: IID[];
}
