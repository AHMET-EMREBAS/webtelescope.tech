import { IID } from '@webpackages/common';
export interface IUpdateRoleDto {
  /**
   * Required unique short text
   */ name?: string;
  description?: string;
  permissions?: IID[];
}
