import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceElementsFactory,
  EntityDataModuleConfig,
} from '@ngrx/data';
import { EntityCollectionService } from '../common';
import { HttpClient } from '@angular/common/http';
import { ICheckout, IID, IOrder, IShoppingCart } from '@webpackages/model';

export const OrderEntityDataModuleConfig: EntityDataModuleConfig = {
  pluralNames: {
    Order: 'Orders',
    Checkout: 'Checkouts',
    ShoppingCart: 'ShoppingCart',
  },
  entityMetadata: {
    Order: {},
    Checkout: {},
    ShoppingCart: {},
  },
};

@Injectable()
export class OrderService extends EntityCollectionService<IOrder<IID, IID>> {
  constructor(
    factory: EntityCollectionServiceElementsFactory,
    httpClient: HttpClient
  ) {
    super('Order', factory, httpClient);
  }
}
@Injectable()
export class CheckoutService extends EntityCollectionService<
  ICheckout<IID, IID, IID>
> {
  constructor(
    factory: EntityCollectionServiceElementsFactory,
    httpClient: HttpClient
  ) {
    super('Checkout', factory, httpClient);
  }
}
@Injectable()
export class ShoppingCartService extends EntityCollectionService<
  IShoppingCart<IID>
> {
  constructor(
    factory: EntityCollectionServiceElementsFactory,
    httpClient: HttpClient
  ) {
    super('ShoppingCart', factory, httpClient);
  }
}
