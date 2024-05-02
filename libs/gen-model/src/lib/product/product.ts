import { IID } from '@webpackages/gen-model';
export interface IProduct {
  name: string;
  description?: string;
  category?: TCategory[];
  department?: TDepartment;
}
