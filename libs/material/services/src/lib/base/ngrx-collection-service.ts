import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';

export abstract class NgrxCollectionService<
  T
> extends EntityCollectionServiceBase<T> {
  constructor(
    entityName: string,
    factory: EntityCollectionServiceElementsFactory
  ) {
    super(entityName, factory);
  }
}
