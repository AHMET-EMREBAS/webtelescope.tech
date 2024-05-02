import { NgrxCollectionService } from '../base';
import { ITicket, ITicketView } from '@webpackages/gen-model';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Injectable } from '@angular/core';

@Injectable()
export class TicketService extends NgrxCollectionService<ITicket> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('Ticket', factory);
  }
}

@Injectable()
export class TicketViewService extends NgrxCollectionService<ITicketView> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('TicketView', factory);
  }
}
