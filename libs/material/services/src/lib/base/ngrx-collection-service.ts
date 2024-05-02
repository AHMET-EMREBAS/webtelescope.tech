import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';

import { names, plural } from '@webpackages/utils';

export abstract class NgrxCollectionService<
  T
> extends EntityCollectionServiceBase<T> {
  allCount$ = inject(HttpClient).get(
    `${plural(names(this.entityName).fileName)}/count`
  );
  constructor(
    entityName: string,
    factory: EntityCollectionServiceElementsFactory
  ) {
    super(entityName, factory);
  }
}
