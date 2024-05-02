import { NgrxCollectionService } from '../base';
import { IProductReturn, IProductReturnView } from '@webpackages/gen-model';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductReturnService extends NgrxCollectionService<IProductReturn> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('ProductReturn', factory);
  }
}

@Injectable()
export class ProductReturnViewService extends NgrxCollectionService<IProductReturnView> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('ProductReturnView', factory);
  }
}
