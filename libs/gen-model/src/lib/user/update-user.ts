import { IID } from '@webpackages/common';
export interface IUpdateUserDto {
  username?: string;
  password?: string;
  role?: IID[];
  department?: IID[];
}
