import { IID } from '@webpackages/common';
export interface ICustomerImg<TCustomer> {
  /**
   * Image url
   */ url: string;
  description?: string;
  owner: TCustomer;
}
