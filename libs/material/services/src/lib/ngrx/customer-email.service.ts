import { NgrxCollectionService } from '../base';
import { ICustomerEmail, ICustomerEmailView } from '@webpackages/gen-model';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomerEmailService extends NgrxCollectionService<ICustomerEmail> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('CustomerEmail', factory);
  }
}

@Injectable()
export class CustomerEmailViewService extends NgrxCollectionService<ICustomerEmailView> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('CustomerEmailView', factory);
  }
}
