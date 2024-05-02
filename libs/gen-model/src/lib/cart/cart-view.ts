import { IID } from '@webpackages/common';
export interface ICartView extends IID {
  description: string;
  /**
   * Is chart checked out or not?
   */
  checked: boolean;
  customerUsername: string;
  userUsername: string;
  storeName: string;
}
