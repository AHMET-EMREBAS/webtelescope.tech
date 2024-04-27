/* eslint-disable @typescript-eslint/no-explicit-any */

import { Model } from '../__meta';
import { IPrint } from '../__printer';
import { ClassType } from './class-type';

export interface IPrinterPickerFactory<R> {
  Entity(...args: any[]): R;
  Update(...args: any[]): R;
  IEntity(...args: any[]): R;
  ICreate(...args: any[]): R;
  IUpdate(...args: any[]): R;
  Query(...args: any[]): R;
  IQuery(...args: any[]): R;
  IView(...args: any[]): R;
  View(...args: any[]): R;
}

export interface INameFactory {
  /**
   *  `${this.fileName}.entity`;
   * Entity  file name
   */
  Entity: string;

  /**
   *  `${this.fileName}.view`;
   * View  file name
   */
  View: string;

  /**
   *  `create-${this.fileName}.dto`;
   * Create  file name
   */
  Create: string;

  /**
   *  `update-${this.fileName}`;
   * Update  file name
   */
  Update: string;

  /**
   *  `query-${this.fileName}`;
   * Query  file name
   */
  Query: string;

  /**
   *  `${this.fileName}`;
   * IEntity  file name
   */
  IEntity: string;

  /**
   *  `${this.fileName}-view`;
   * IView  file name
   */
  IView: string;

  /**
   *  `create-${this.fileName}`;
   * ICreate  file name
   */
  ICreate: string;

  /**
   *  `update-${this.fileName}`;
   * IUpdate  file name
   */
  IUpdate: string;

  /**
   *  `query-${this.fileName}`;
   * IQuery  file name
   */
  IQuery: string;
}

export interface IPicker<T, R, O = unknown> {
  pick(type: T): R;
  pick(type: T, options: O): R;
}

export interface INamePickerByClassType extends IPicker<ClassType, string> {}

export interface IPrinterPickerByClassType extends IPicker<ClassType, IPrint> {}
export interface IPrinterPickerByClassTypeAndModel
  extends IPicker<ClassType, IPrint, Model> {}

