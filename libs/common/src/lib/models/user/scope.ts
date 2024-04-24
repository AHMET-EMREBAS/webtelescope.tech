import { IBaseModel } from '../common';

export interface IScope extends IBaseModel {
  name: string;
}

export interface ICreateScopeDto extends Pick<IScope, 'name'> {}
export interface IUpdateScopeDto extends Partial<ICreateScopeDto> {}
export interface IQueryScopeDto extends Pick<IScope, 'name'> {}
