import { IID } from '@webpackages/common';
export interface IRole {
  /**
   * Required unique short text
   */ name: string;
  description?: string;
  permissions?: TPermission[];
}
