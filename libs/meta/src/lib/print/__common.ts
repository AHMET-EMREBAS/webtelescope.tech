export enum ClassType {
  Entity = 'Entity',
  View = 'View',
  CreateDto = 'CreateDto',
  UpdateDto = 'UpdateDto',
  QueryDto = 'QueryDto',
  IEntity = 'IEntity',
  IView = 'IView',
  ICreateDto = 'ICreateDto',
  IUpdateDto = 'IUpdateDto',
  IQueryDto = 'IQueryDto',
}

export enum CommonObjectTypes {
  IDDto = 'IDDto',
  IID = 'IID',
  IBaseQueryDto = 'IBaseQueryDto',
  BaseEntity = 'BaseEntity',
  IBaseEntity = 'IBaseEntity',
  BaseEntityView = 'BaseEntityView',
  GENERIC_PREFIX = 'T',
}

export enum ClassDeclerationType {
  CLASS = 'class',
  INTERFACE = 'interface',
}

export interface IImplement {
  implements(): string;
}

export interface IExtend {
  extendings(): string;
}

export interface IArray {
  isArray(): string;
}

export interface IName {
  /**
   * Property name or model name
   */
  name(): string;

  /**
   * Property name with model name prefix for database table views.
   */
  viewName(modelName: string, propertyName: string): string;
}

export interface IClassName {
  /**
   * Create a variant of class name from classType.
   * For example CreateDto, UpdateDto, QueryDto, SomeView, ISome etc.
   * @param classType
   * @param className
   */
  toClassName(classType: ClassType, className: string): string;
}

export interface IType {
  type(): string;
}

export interface IRequried {
  isRequried(): string;
}

export type DecoratorName =
  | 'Column'
  | 'Property'
  | 'ViewColumn'
  | 'Entity'
  | 'Dto'
  | 'One'
  | 'Many'
  | 'Owner';

export enum DecoratorNames {
  COLUMN = 'Column',
  PROPERTY = 'Property',
  VIEWCOLUMN = 'ViewColumn',
  ENTITY = 'Entity',
  DTO = 'Dto',
  ONE = 'One',
  MANY = 'Many',
  OWNER = 'Owner',
}
export interface IDecorate {
  /**
   * Print the decorator
   */
  decorators(): string;
}

export interface IImport {
  /**
   * Print the required imports for properties and classes.
   */
  importing(): string;
}

export interface IPrint {
  print(): string;
}

export interface IFormatImport {
  /**
   *
   * @param from package name or dir name
   * @param items list of importing items
   */
  formatImport(from: string, ...items: string[]): string;
}

export interface IToName {
  /**
   * Transform a list of string into a property name
   * For example [first,second, third] will be firstSecondThird
   * @param items
   */
  toPropertyName(...items: string[]): string;

  /**
   * Convert class name into file nmae
   * @param name
   */
  toFileName(name: string): string;

  /**
   * Conver property name into class name
   * @param name
   */
  toClassName(name: string): string;
}

export interface IGeneric {
  /**
   * Classes or interfaces might have generics.
   * Implement this function to print generics.
   */
  generics(): string;
}
