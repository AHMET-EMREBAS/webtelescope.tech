export enum ClassTypes {
  Entity,
  View,
  CreateDto,
  UpdateDto,
  QueryDto,
  IEntity,
  IView,
  ICreateDto,
  IUpdateDto,
  IQueryDto,
}

export interface IImplement {
  implements(): string;
}

export interface IExtend {
  extendings(): string;
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
