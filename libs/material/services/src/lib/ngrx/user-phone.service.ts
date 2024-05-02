import { NgrxCollectionService } from '../base';
import { IUserPhone, IUserPhoneView } from '@webpackages/gen-model';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Injectable } from '@angular/core';

@Injectable()
export class UserPhoneService extends NgrxCollectionService<IUserPhone> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('UserPhone', factory);
  }
}

@Injectable()
export class UserPhoneViewService extends NgrxCollectionService<IUserPhoneView> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('UserPhoneView', factory);
  }
}
