import { NgrxCollectionService } from '../base';
import { ISku, ISkuView } from '@webpackages/gen-model';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Injectable } from '@angular/core';

@Injectable()
export class SkuService extends NgrxCollectionService<ISku> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('Sku', factory);
  }
}

@Injectable()
export class SkuViewService extends NgrxCollectionService<ISkuView> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('SkuView', factory);
  }
}
