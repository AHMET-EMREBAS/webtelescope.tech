import { NgrxCollectionService } from '../base';
import { ICustomerImg, ICustomerImgView } from '@webpackages/gen-model';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomerImgService extends NgrxCollectionService<ICustomerImg> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('CustomerImg', factory);
  }
}

@Injectable()
export class CustomerImgViewService extends NgrxCollectionService<ICustomerImgView> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('CustomerImgView', factory);
  }
}
