import { IID } from '@webpackages/common';
export interface IUpdateProductImgDto {
  /**
   * Image url
   */ url?: string;
  description?: string;
  owner?: IID;
}
