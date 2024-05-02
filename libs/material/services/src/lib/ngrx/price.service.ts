import { NgrxCollectionService } from '../base';
import { IPrice, IPriceView } from '@webpackages/gen-model';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Injectable } from '@angular/core';

@Injectable()
export class PriceService extends NgrxCollectionService<IPrice> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('Price', factory);
  }
}

@Injectable()
export class PriceViewService extends NgrxCollectionService<IPriceView> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('PriceView', factory);
  }
}
