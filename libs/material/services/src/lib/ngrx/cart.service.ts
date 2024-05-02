import { NgrxCollectionService } from '../base';
import { ICart, ICartView } from '@webpackages/gen-model';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Injectable } from '@angular/core';

@Injectable()
export class CartService extends NgrxCollectionService<ICart> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('Cart', factory);
  }
}

@Injectable()
export class CartViewService extends NgrxCollectionService<ICartView> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('CartView', factory);
  }
}
