import { NgrxCollectionService } from '../base';
import { IUserImg, IUserImgView } from '@webpackages/gen-model';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Injectable } from '@angular/core';

@Injectable()
export class UserImgService extends NgrxCollectionService<IUserImg> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('UserImg', factory);
  }
}

@Injectable()
export class UserImgViewService extends NgrxCollectionService<IUserImgView> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('UserImgView', factory);
  }
}
