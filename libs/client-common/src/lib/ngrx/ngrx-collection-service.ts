import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import {  IPaginatorDto } from '@webpackages/common';

import { names, plural } from '@webpackages/utils';

/**
 *
 */
export abstract class NgrxCollectionService<
  T,
  CT extends Partial<T> = T,
  UD = Partial<CT>,
  QD = {}
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

  queryEntity(paginator: IPaginatorDto, query: QD) {
    return this.getWithQuery({ ...paginator, ...query });
  }

  createEntity(entity: CT): void {
    this.add({ id: 1, ...entity } as T);
  }

  updateEntity(id: number, entity: UD): void {
    this.update({ id, ...entity } as T);
  }

  deleteEntity(id: number): void {
    this.delete({ id } as T);
  }
}
