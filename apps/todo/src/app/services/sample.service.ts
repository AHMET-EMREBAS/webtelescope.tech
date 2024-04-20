import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { ISample } from '@webpackages/common';

@Injectable()
export class SampleService extends EntityCollectionServiceBase<ISample> {
  constructor(public readonly factory: EntityCollectionServiceElementsFactory) {
    super('Sample', factory);
  }
}
