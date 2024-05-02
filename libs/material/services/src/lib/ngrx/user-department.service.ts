import { NgrxCollectionService } from '../base';
import { IUserDepartment, IUserDepartmentView } from '@webpackages/gen-model';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Injectable } from '@angular/core';

@Injectable()
export class UserDepartmentService extends NgrxCollectionService<IUserDepartment> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('UserDepartment', factory);
  }
}

@Injectable()
export class UserDepartmentViewService extends NgrxCollectionService<IUserDepartmentView> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('UserDepartmentView', factory);
  }
}
