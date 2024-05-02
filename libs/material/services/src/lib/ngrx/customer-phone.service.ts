import { NgrxCollectionService } from '../base';
import { ICustomerPhone, ICustomerPhoneView } from '@webpackages/gen-model';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomerPhoneService extends NgrxCollectionService<ICustomerPhone> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('CustomerPhone', factory);
  }
}

@Injectable()
export class CustomerPhoneViewService extends NgrxCollectionService<ICustomerPhoneView> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('CustomerPhoneView', factory);
  }
}
