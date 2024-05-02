import { NgrxCollectionService } from '../base';
import { ICustomerAddress, ICustomerAddressView } from '@webpackages/gen-model';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomerAddressService extends NgrxCollectionService<ICustomerAddress> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('CustomerAddress', factory);
  }
}

@Injectable()
export class CustomerAddressViewService extends NgrxCollectionService<ICustomerAddressView> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('CustomerAddressView', factory);
  }
}
