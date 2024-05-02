import { IID } from '@webpackages/common';
export interface IRole<TPermission = IID> {
  /**
   * Required unique short text
   */
  name: string;
  description?: string;
  permissions?: TPermission[];
}
