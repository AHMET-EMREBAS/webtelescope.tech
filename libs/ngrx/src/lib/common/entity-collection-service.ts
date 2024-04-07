/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import {
  IID,
  IQuery,
  transformWhereObjectToQueryString,
} from '@webpackages/model';
import { names, plural } from '@webpackages/utils';

export class EntityCollectionService<
  T extends IID
> extends EntityCollectionServiceBase<T> {
  allCount$ = this.httpClient.get<number>(
    `api/${plural(names(this.entityName).fileName)}/count`
  );
  constructor(
    modelName: string,
    elementFactory: EntityCollectionServiceElementsFactory,
    protected readonly httpClient: HttpClient
  ) {
    super(modelName, elementFactory);
  }

  query(queryDto: IQuery) {
    return this.getWithQuery({
      ...queryDto,
      where: queryDto.where
        ?.map((e) => transformWhereObjectToQueryString(e))
        .join('&'),
    } as any);
  }
}

export function CollectionService<T extends IID>(
  entityName: string
): Type<EntityCollectionService<T>> {
  @Injectable()
  class __CollectionService extends EntityCollectionService<T> {
    constructor(
      factory: EntityCollectionServiceElementsFactory,
      httpClient: HttpClient
    ) {
      super(entityName, factory, httpClient);
    }
  }

  return __CollectionService;
}
