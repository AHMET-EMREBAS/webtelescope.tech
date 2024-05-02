import { IID } from '@webpackages/common';
export interface ICreateUserDto {
  username: string;
  password: string;
  role?: IID[];
  department?: IID[];
}
