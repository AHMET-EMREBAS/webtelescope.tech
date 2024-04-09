import { IID } from '../../common';

export interface IScope extends IID {
  /**
   * Unique request scope
   */
  scope: string;
}
