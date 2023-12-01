import {
  AfterInsert,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Quantity } from './quantity.entity';

@EventSubscriber()
export class QuantitySubscriber implements EntitySubscriberInterface {
  listenTo() {
    return Quantity;
  }

  @AfterInsert()
  afterInsert(event: InsertEvent<any>): void | Promise<any> {
    // TODO:
  }
}
