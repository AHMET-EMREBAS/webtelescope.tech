import {
  AfterInsert,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { PriceLevel } from './price-level.entity';

@EventSubscriber()
export class PriceLevelSubscriber implements EntitySubscriberInterface {
  listenTo() {
    return PriceLevel;
  }

  @AfterInsert()
  afterInsert(event: InsertEvent<any>): void | Promise<any> {
    // TODO:
  }
}
