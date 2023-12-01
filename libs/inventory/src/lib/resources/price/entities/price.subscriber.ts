import {
  AfterInsert,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Price } from './price.entity';

@EventSubscriber()
export class PriceSubscriber implements EntitySubscriberInterface {
  listenTo() {
    return Price;
  }

  @AfterInsert()
  afterInsert(event: InsertEvent<any>): void | Promise<any> {
    // TODO:
  }
}
