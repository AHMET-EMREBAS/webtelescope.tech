import { NgrxCollectionService } from '../base';
import { IUserAddress, IUserAddressView } from '@webpackages/gen-model';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Injectable } from '@angular/core';

@Injectable()
export class UserAddressService extends NgrxCollectionService<IUserAddress> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('UserAddress', factory);
  }
}

@Injectable()
export class UserAddressViewService extends NgrxCollectionService<IUserAddressView> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('UserAddressView', factory);
  }
}
