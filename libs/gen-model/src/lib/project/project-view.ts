import { IID } from '@webpackages/common';
export interface IProjectView extends IID {
  /**
   * Required unique short text
   */
  name: string;
  description: string;
}
