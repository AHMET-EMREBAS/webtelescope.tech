import { ResourceService } from '@webpackages/components';
import { Product } from './entity';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProductService extends ResourceService<Product> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('Product', factory);
  }
}
