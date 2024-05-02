import { IID } from '@webpackages/common';
export interface ICreateUserDto {
  username: string;
  password: string;
  roles?: IID[];
  department?: IID;
}
