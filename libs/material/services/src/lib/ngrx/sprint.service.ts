import { NgrxCollectionService } from '../base';
import { ISprint, ISprintView } from '@webpackages/gen-model';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Injectable } from '@angular/core';

@Injectable()
export class SprintService extends NgrxCollectionService<ISprint> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('Sprint', factory);
  }
}

@Injectable()
export class SprintViewService extends NgrxCollectionService<ISprintView> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('SprintView', factory);
  }
}
