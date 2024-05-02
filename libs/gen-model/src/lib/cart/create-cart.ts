import { IID } from '@webpackages/common';
export interface ICreateCartDto {
  description?: string;
  /**
   * Is chart checked out or not?
   */ checked?: boolean;
  customer: IID;
  employee: IID;
  store: IID;
}
