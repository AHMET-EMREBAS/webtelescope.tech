import { IID } from '@webpackages/common';
export interface IProduct<TCategory = IID, TDepartment = IID> extends IID {
  barcode: string;
  /**
   * Required unique short text
   */
  name: string;
  description?: string;
  category?: TCategory;
  department?: TDepartment;
}
