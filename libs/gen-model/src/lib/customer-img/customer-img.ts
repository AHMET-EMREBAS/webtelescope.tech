import { IID } from '@webpackages/common';
export interface ICustomerImg<TCustomer = IID> extends IID {
  /**
   * Image url
   */
  url: string;
  description?: string;
  customer: TCustomer;
}
