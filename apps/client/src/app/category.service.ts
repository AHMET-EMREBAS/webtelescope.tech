import { Injectable } from '@angular/core';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { ResourceService } from '@webpackages/components';

export interface Category {
  name: string;
}

@Injectable({ providedIn: 'root' })
export class CategoryService extends ResourceService<Category> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('Category', factory);
  }
}
