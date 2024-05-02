import { IID } from '@webpackages/common';
export interface IRoleView extends IID {
  /**
   * Required unique short text
   */
  name: string;
  description: string;
  permissionName: string;
}
