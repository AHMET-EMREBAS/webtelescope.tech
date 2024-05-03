import { ICategory } from '@webpackages/gen-model';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Injectable } from '@angular/core';
import { NgrxCollectionService } from '@webpackages/client-common';

@Injectable()
export class CategoryService extends NgrxCollectionService<ICategory> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('Category', factory);
  }
}
