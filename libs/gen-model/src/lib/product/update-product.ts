import { IID } from '@webpackages/common';
export interface IUpdateProductDto {
  barcode?: string;
  /**
   * Required unique short text
   */ name?: string;
  description?: string;
  category?: IID[];
  department?: IID;
}
