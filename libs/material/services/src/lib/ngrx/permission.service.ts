import { NgrxCollectionService } from '../base';
import { IPermission, IPermissionView } from '@webpackages/gen-model';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Injectable } from '@angular/core';

@Injectable()
export class PermissionService extends NgrxCollectionService<IPermission> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('Permission', factory);
  }
}

@Injectable()
export class PermissionViewService extends NgrxCollectionService<IPermissionView> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('PermissionView', factory);
  }
}
