import { HttpClient } from '@angular/common/http';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { IID } from '@webpackages/model';
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

  quer(queryDto: IQUeryDTo) {}
}
