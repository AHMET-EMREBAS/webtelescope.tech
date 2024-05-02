import { IID } from '@webpackages/common';
export interface ICreateUserContactDto {
  state?: string;
  city?: string;
  street?: string;
  zip?: string;
  owner: IID;
}
