import { IID } from '../../common';

export interface IApp extends IID {
  /**
   * Unique application name
   */
  appName: string;
}
