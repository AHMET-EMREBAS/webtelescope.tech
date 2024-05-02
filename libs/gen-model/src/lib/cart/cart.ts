import { IID } from '@webpackages/common';
export interface ICart<TCustomer = IID, TUser = IID, TStore = IID> extends IID {
  description?: string;
  /**
   * Is chart checked out or not?
   */
  checked?: boolean;
  customer: TCustomer;
  user: TUser;
  store: TStore;
}
