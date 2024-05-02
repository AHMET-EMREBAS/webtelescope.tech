import { IID } from '@webpackages/common';
export interface ICreateCustomerProfileDto {
  firstName?: string;
  lastName?: string;
  customer: IID;
}
