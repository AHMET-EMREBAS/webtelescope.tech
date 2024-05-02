import { NgrxCollectionService } from '../base';
import { IUserProfile, IUserProfileView } from '@webpackages/gen-model';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Injectable } from '@angular/core';

@Injectable()
export class UserProfileService extends NgrxCollectionService<IUserProfile> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('UserProfile', factory);
  }
}

@Injectable()
export class UserProfileViewService extends NgrxCollectionService<IUserProfileView> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('UserProfileView', factory);
  }
}
