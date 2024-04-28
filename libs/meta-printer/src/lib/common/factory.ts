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

/**
 * Provide a convenient interface to pick names based on {@link ClassType}
 */
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
  /**
   * Pick by type
   */
  pick(type: T): R;

  /**
   * Pick by type and configure with options
   */
  pick(type: T, options: O): R;
}

/**
 * Pick string value by {@link ClassType}
 */
export interface INamePickerByClassType extends IPicker<ClassType, string> {}

/**
 * Pick {@link IPrint } by {@link ClassType}
 */
export interface IPrinterPickerByClassType extends IPicker<ClassType, IPrint> {}

/**
 * Pick {@link IPring} by {@link ClassType} and provide {@link Model} configuration.
 * When the printer needs model metadata, then implement this interface.
 */
export interface IPrinterPickerByClassTypeAndModel
  extends IPicker<ClassType, IPrint, Model> {}
