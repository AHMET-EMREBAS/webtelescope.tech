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
   * Property namem with model name prefix for database table views.
   */
  viewName(modelName: string): string;
}

export interface IType {
  type(): string;
}

export interface IRequried {
  isRequried(): string;
}

export interface IDecorate {
  decorators(): string;
}

export interface IImport {
  importing(): string;
}

export interface IPrint {
  print(): string;
}
