import { NgrxCollectionService } from '../base';
import { IRole, IRoleView } from '@webpackages/gen-model';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Injectable } from '@angular/core';

@Injectable()
export class RoleService extends NgrxCollectionService<IRole> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('Role', factory);
  }
}

@Injectable()
export class RoleViewService extends NgrxCollectionService<IRoleView> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('RoleView', factory);
  }
}
