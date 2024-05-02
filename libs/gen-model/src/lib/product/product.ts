import { IID } from '@webpackages/common';
export interface IProduct<TCategory, TDepartment> {
  barcode: string;
  /**
   * Required unique short text
   */
  name: string;
  description?: string;
  category?: TCategory[];
  department?: TDepartment;
}
