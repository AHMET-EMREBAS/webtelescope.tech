import { Injectable } from '@angular/core';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { BaseNgrxDataService } from '@webpackages/material';

export type Category = {
  name?: string | null;
};

@Injectable({ providedIn: 'root' })
export class CategoryService extends BaseNgrxDataService<Category> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Category', serviceElementsFactory);
  }
}
