/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @nx/enforce-module-boundaries */
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Provider, Type, inject } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { Observable, map } from 'rxjs';
import { excludeUndefined, names } from '@webpackages/utils';
import { ENTITY_NAME_TOKEN } from '../providers';

export type QueryObject = {
  take?: number;
  skip?: number;
  orderBy?: string;
  orderDir?: string;
  withDeleted?: boolean;
  search?: string;
};

export type ErrorType = {
  property: string;
  constraints: Record<string, string>;
};

export type EntityMetadata = {
  count: number;
};

@Injectable({ providedIn: 'root', useExisting: true })
export class ResourceService<T> extends EntityCollectionServiceBase<T> {
  errorMessages$ = this.errors$.pipe(
    map((err) => {
      return err.payload.data.error.error.error.message as ErrorType[];
    })
  );

  nameVariants = names(this.entityName);

  allCount$: Observable<number> = inject(HttpClient)
    .get<EntityMetadata>(`api/${this.nameVariants.fileName}-meta`)
    .pipe(
      map((data) => {
        return data.count;
      })
    );

  constructor(
    @Inject(ENTITY_NAME_TOKEN) entityName: string,
    serviceElementsFactory: EntityCollectionServiceElementsFactory
  ) {
    super(entityName, serviceElementsFactory);
  }

  /**
   * Generate unique id
   * @returns number
   */
  private nid() {
    return new Date().getTime();
  }

  /**
   * Use this method
   * @param id
   * @returns
   */
  deleteItem(id: number) {
    return this.removeOneFromCache(id);
  }

  /**
   * Use this method
   * @param item
   * @returns
   */
  updateItem(item: T) {
    return this.updateOneInCache(item);
  }

  /**
   * @important Use this method!
   * @param item
   */
  saveItem(item: T) {
    this.add({ ...item, id: this.nid() });
  }

  queryItem(query: QueryObject) {
    this.clearCache();
    const q = excludeUndefined(query);
    this.getWithQuery(q);
  }

  search(text: string) {
    this.queryItem({ take: 20, search: text });
  }
}

export function provideResourceService(
  service: Type<ResourceService<any>>
): Provider {
  return {
    provide: ResourceService,
    useClass: service,
  };
}
