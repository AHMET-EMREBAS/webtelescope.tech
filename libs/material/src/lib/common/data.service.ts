import { inject } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';

import { Observable } from 'rxjs';

export type QueryParams = {
  take?: number;
  skip?: number;
  withDeleted?: boolean;
  search?: string;
  orderBy?: string;
  orderDir?: 'ASC' | 'DESC';
};

export class EntityService<T> extends EntityCollectionServiceBase<T> {
  constructor(entityName: string) {
    super(entityName, inject(EntityCollectionServiceElementsFactory));
  }

  findAll(queryParams: QueryParams): Observable<T[]> {
    return this.getWithQuery(queryParams);
  }
}
