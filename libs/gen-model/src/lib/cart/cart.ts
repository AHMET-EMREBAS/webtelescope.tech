import { IID } from '@webpackages/common';
export interface ICart {
  description?: string;
  /**
   * Is chart checked out or not?
   */ checked?: boolean;
  customer: TCustomer;
  employee: TUser;
  store: TStore;
}
