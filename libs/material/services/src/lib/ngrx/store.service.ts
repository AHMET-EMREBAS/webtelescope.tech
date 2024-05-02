import { NgrxCollectionService } from '../base';
import { IStore, IStoreView } from '@webpackages/gen-model';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Injectable } from '@angular/core';

@Injectable()
export class StoreService extends NgrxCollectionService<IStore> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('Store', factory);
  }
}

@Injectable()
export class StoreViewService extends NgrxCollectionService<IStoreView> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('StoreView', factory);
  }
}
