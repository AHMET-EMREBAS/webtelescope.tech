import { NgrxCollectionService } from '../base';
import { IQuantity, IQuantityView } from '@webpackages/gen-model';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Injectable } from '@angular/core';

@Injectable()
export class QuantityService extends NgrxCollectionService<IQuantity> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('Quantity', factory);
  }
}

@Injectable()
export class QuantityViewService extends NgrxCollectionService<IQuantityView> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('QuantityView', factory);
  }
}
