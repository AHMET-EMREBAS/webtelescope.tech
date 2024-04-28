/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  ColumnOptions,
  Model,
  PropertyOptions,
  RelationOptions,
} from '../__meta';
import { IPrint } from '../__printer';
import { ClassType } from './class-type';

export interface IPrinterPickerFactory {
  Entity(...args: any[]): IPrint;
  Update(...args: any[]): IPrint;
  IEntity(...args: any[]): IPrint;
  ICreate(...args: any[]): IPrint;
  IUpdate(...args: any[]): IPrint;
  Query(...args: any[]): IPrint;
  IQuery(...args: any[]): IPrint;
  IView(...args: any[]): IPrint;
  View(...args: any[]): IPrint;
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

export interface IPicker<
  TParam = ClassType,
  TReturn = IPrint,
  TOptions = unknown
> {
  /**
   * Pick by type
   */
  pick(type: TParam): TReturn;

  /**
   * Pick by type and configure with options
   */
  pick(type: TParam, options?: TOptions): TReturn;
}

/**
 * Pick string value by {@link ClassType}
 */
export interface IStringPickerByClassType
  extends IPicker<ClassType, string, string> {}

export interface IPickValuePickerByClassName<ValueType>
  extends IPicker<ClassType, ValueType, boolean> {}

/**
 * Pick string value by {@link ClassType}
 */
export interface IConditionalPickerByClassName<T = boolean>
  extends IPicker<ClassType, boolean, T> {}

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

export interface IPrinterPickerByCLassTypeAndPropertyOptions
  extends IPicker<
    ClassType,
    IPrint,
    PropertyOptions | ColumnOptions | RelationOptions
  > {}
