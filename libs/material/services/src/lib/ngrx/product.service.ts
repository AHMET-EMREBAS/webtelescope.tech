import { NgrxCollectionService } from '../base';
import { IProduct, IProductView } from '@webpackages/gen-model';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductService extends NgrxCollectionService<IProduct> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('Product', factory);
  }
}

@Injectable()
export class ProductViewService extends NgrxCollectionService<IProductView> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('ProductView', factory);
  }
}
