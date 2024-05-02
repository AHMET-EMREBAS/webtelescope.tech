import { NgrxCollectionService } from '../base';
import { IProductImg, IProductImgView } from '@webpackages/gen-model';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductImgService extends NgrxCollectionService<IProductImg> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('ProductImg', factory);
  }
}

@Injectable()
export class ProductImgViewService extends NgrxCollectionService<IProductImgView> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('ProductImgView', factory);
  }
}
