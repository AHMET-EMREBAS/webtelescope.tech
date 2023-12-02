import { ResourceService } from '@webpackages/components';
import { Category } from './category';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CategoryService extends ResourceService<Category> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('Category', factory);
  }
}
