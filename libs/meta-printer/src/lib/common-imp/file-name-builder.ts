import { names } from '@webpackages/utils';
import { ICoverAllClassTypes } from '../common/cover-all-class-types';

export enum FileName {
  Entity = '#.entity',
  View = '#.view',
  CreateDto = 'create-#.dto',
  UpdateDto = 'update-#.dto',
  QueryDto = 'query-#.dto',
  IEntity = '#',
  IView = '#-view',
  ICreateDto = 'create-#',
  IUpdateDto = 'update-#',
  IQueryDto = 'query-#',
}

export type Backward = '' | './' | '../' | '../../';

export class FileNameBuilder implements ICoverAllClassTypes<string>  {
  constructor(protected readonly className: string) {}

  protected __replace(placeholder: string) {
    return placeholder.replace('#', names(this.className).fileName);
  }

  Dir() {
    return names(this.className).fileName;
  }

  Entity() {
    return this.__replace(FileName.Entity);
  }

  View() {
    return this.__replace(FileName.View);
  }

  Create() {
    return this.__replace(FileName.CreateDto);
  }

  Update() {
    return this.__replace(FileName.UpdateDto);
  }

  Query() {
    return this.__replace(FileName.QueryDto);
  }
  IEntity() {
    return this.__replace(FileName.IEntity);
  }
  IView() {
    return this.__replace(FileName.IView);
  }
  ICreate() {
    return this.__replace(FileName.ICreateDto);
  }
  IUpdate() {
    return this.__replace(FileName.IUpdateDto);
  }
  IQuery() {
    return this.__replace(FileName.IQueryDto);
  }
}
