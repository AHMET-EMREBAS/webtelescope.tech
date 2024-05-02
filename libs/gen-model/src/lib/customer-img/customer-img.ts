import { IID } from '@webpackages/common';
export interface ICustomerImg {
  /**
   * Image url
   */ url: string;
  description?: string;
  owner: TCustomer;
}
