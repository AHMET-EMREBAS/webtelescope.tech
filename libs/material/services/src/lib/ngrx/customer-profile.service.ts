import { NgrxCollectionService } from '../base';
import { ICustomerProfile, ICustomerProfileView } from '@webpackages/gen-model';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomerProfileService extends NgrxCollectionService<ICustomerProfile> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('CustomerProfile', factory);
  }
}

@Injectable()
export class CustomerProfileViewService extends NgrxCollectionService<ICustomerProfileView> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('CustomerProfileView', factory);
  }
}
