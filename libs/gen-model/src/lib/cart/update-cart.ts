import { IID } from '@webpackages/common';
export interface IUpdateCartDto {
  description?: string;
  /**
   * Is chart checked out or not?
   */
  checked?: boolean;
  customer?: IID;
  user?: IID;
  store?: IID;
}
