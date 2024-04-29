import { names } from '@webpackages/utils';

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

export class FileNameBuilder {
  constructor(protected className: string) {
    this.className = names(className).fileName;
  }

  protected __replace(placeholder: string) {
    return placeholder.replace('#', this.className);
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
