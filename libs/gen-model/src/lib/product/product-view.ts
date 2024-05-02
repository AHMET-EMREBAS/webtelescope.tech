import { IID } from '@webpackages/common';
export interface IProductView extends IID {
  barcode: string;
  /**
   * Required unique short text
   */
  name: string;
  description: string;
  categoryName: string;
  departmentName: string;
}
