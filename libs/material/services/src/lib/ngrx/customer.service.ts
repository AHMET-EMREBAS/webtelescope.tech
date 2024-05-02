import { NgrxCollectionService } from '../base';
import { ICustomer, ICustomerView } from '@webpackages/gen-model';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomerService extends NgrxCollectionService<ICustomer> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('Customer', factory);
  }
}

@Injectable()
export class CustomerViewService extends NgrxCollectionService<ICustomerView> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('CustomerView', factory);
  }
}
