import { NgrxCollectionService } from '../base';
import { ISale, ISaleView } from '@webpackages/gen-model';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Injectable } from '@angular/core';

@Injectable()
export class SaleService extends NgrxCollectionService<ISale> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('Sale', factory);
  }
}

@Injectable()
export class SaleViewService extends NgrxCollectionService<ISaleView> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('SaleView', factory);
  }
}
