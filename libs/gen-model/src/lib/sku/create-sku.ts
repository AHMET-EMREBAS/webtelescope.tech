import { IID } from '@webpackages/common';
export interface ICreateSkuDto {
  barcode: string;
  sku: string;
  /**
   * Required unique short text
   */ name: string;
  description?: string;
  product: IID;
}
