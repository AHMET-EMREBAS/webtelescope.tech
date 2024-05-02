import { NgrxCollectionService } from '../base';
import { IPriceLevel, IPriceLevelView } from '@webpackages/gen-model';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Injectable } from '@angular/core';

@Injectable()
export class PriceLevelService extends NgrxCollectionService<IPriceLevel> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('PriceLevel', factory);
  }
}

@Injectable()
export class PriceLevelViewService extends NgrxCollectionService<IPriceLevelView> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('PriceLevelView', factory);
  }
}
