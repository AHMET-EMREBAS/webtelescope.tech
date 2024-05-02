import { IID } from '@webpackages/common';
export interface ICreateRoleDto {
  /**
   * Required unique short text
   */ name: string;
  description?: string;
  permissions?: IID[];
}
