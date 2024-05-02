import { IID } from '@webpackages/common';
export interface IRole<TPermission> {
  /**
   * Required unique short text
   */
  name: string;
  description?: string;
  permissions?: TPermission[];
}
