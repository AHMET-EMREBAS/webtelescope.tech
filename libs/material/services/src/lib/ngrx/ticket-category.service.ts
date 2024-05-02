import { NgrxCollectionService } from '../base';
import { ITicketCategory, ITicketCategoryView } from '@webpackages/gen-model';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Injectable } from '@angular/core';

@Injectable()
export class TicketCategoryService extends NgrxCollectionService<ITicketCategory> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('TicketCategory', factory);
  }
}

@Injectable()
export class TicketCategoryViewService extends NgrxCollectionService<ITicketCategoryView> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('TicketCategoryView', factory);
  }
}
