import { NgrxCollectionService } from '../base';
import { IOrder, IOrderView } from '@webpackages/gen-model';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Injectable } from '@angular/core';

@Injectable()
export class OrderService extends NgrxCollectionService<IOrder> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('Order', factory);
  }
}

@Injectable()
export class OrderViewService extends NgrxCollectionService<IOrderView> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('OrderView', factory);
  }
}
