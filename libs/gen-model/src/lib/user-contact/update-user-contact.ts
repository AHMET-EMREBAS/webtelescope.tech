import { IID } from '@webpackages/common';
export interface IUpdateUserContactDto {
  state?: string;
  city?: string;
  street?: string;
  zip?: string;
  user?: IID;
}
