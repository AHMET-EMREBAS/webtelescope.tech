import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { Observable } from 'rxjs';

const genID = () => Math.floor(Math.random() * 100000) + 1;

export type EntityMeta = {
  count: number;
};
export class BaseNgrxDataService<T> extends EntityCollectionServiceBase<T> {
  httpClient = inject(HttpClient);
  meta$!: Observable<EntityMeta>;
  constructor(
    entityName: string,
    serviceElementsFactory: EntityCollectionServiceElementsFactory
  ) {
    super(entityName, serviceElementsFactory);

    this.meta$ = this.httpClient.get<EntityMeta>(
      `api/meta/?entity=${this.entityName}`
    );
  }

  saveItem(item: T) {
    this.addOneToCache({ ...item, id: genID() });
  }

  deleteItem(id: number) {
    this.delete(id);
  }
}
