import { IID } from '@webpackages/common';
export interface ICreateProjectDto {
  /**
   * Required unique short text
   */
  name: string;
  description?: string;
}
