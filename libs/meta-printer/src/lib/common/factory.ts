import { ClassType } from './class-type';

export interface IPrinterPickerFactory<T> {
  PickPrinter(classType: ClassType): T;
  Create(modelName?: string): T;
  Entity(modelName?: string): T;
  Update(modelName?: string): T;
  IEntity(modelName?: string): T;
  ICreate(modelName?: string): T;
  IUpdate(modelName?: string): T;
  Query(modelName?: string): T;
  IQuery(modelName?: string): T;
  IView(modelName?: string): T;
  View(modelName?: string): T;
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
