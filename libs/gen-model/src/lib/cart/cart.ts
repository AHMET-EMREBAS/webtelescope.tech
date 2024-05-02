import { IID } from '@webpackages/common';
export interface ICart<TCustomer, TUser, TStore> {
  description?: string;
  /**
   * Is chart checked out or not?
   */
  checked?: boolean;
  customer: TCustomer;
  user: TUser;
  store: TStore;
}
