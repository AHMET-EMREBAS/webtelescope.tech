import { IID } from '@webpackages/common';
export interface IUpdateUserImgDto {
  /**
   * Image url
   */ url?: string;
  description?: string;
  owner?: IID;
}
