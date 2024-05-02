import { NgrxCollectionService } from '../base';
import { ICategory, ICategoryView } from '@webpackages/gen-model';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoryService extends NgrxCollectionService<ICategory> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('Category', factory);
  }
}

@Injectable()
export class CategoryViewService extends NgrxCollectionService<ICategoryView> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('CategoryView', factory);
  }
}
