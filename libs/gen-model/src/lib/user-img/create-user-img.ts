import { IID } from '@webpackages/common';
export interface ICreateUserImgDto {
  /**
   * Image url
   */
  url: string;
  description?: string;
  user: IID;
}
