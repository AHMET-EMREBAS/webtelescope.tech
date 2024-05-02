import { IID } from '@webpackages/common';
export interface ICreateProductDto {
  barcode: string;
  /**
   * Required unique short text
   */
  name: string;
  description?: string;
  category?: IID;
  department?: IID;
}
