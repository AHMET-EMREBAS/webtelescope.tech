import { NgrxCollectionService } from '../base';
import { IDepartment, IDepartmentView } from '@webpackages/gen-model';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Injectable } from '@angular/core';

@Injectable()
export class DepartmentService extends NgrxCollectionService<IDepartment> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('Department', factory);
  }
}

@Injectable()
export class DepartmentViewService extends NgrxCollectionService<IDepartmentView> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('DepartmentView', factory);
  }
}
