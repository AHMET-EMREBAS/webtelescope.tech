import { IID } from '@webpackages/common';
export interface IProject extends IID {
  /**
   * Required unique short text
   */
  name: string;
  description?: string;
}
