import { NgrxCollectionService } from '../base';
import { IUser, IUserView } from '@webpackages/gen-model';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService extends NgrxCollectionService<IUser> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('User', factory);
  }
}

@Injectable()
export class UserViewService extends NgrxCollectionService<IUserView> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('UserView', factory);
  }
}
