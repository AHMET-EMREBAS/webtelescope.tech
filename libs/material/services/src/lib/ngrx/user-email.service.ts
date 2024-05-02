import { NgrxCollectionService } from '../base';
import { IUserEmail, IUserEmailView } from '@webpackages/gen-model';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Injectable } from '@angular/core';

@Injectable()
export class UserEmailService extends NgrxCollectionService<IUserEmail> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('UserEmail', factory);
  }
}

@Injectable()
export class UserEmailViewService extends NgrxCollectionService<IUserEmailView> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('UserEmailView', factory);
  }
}
