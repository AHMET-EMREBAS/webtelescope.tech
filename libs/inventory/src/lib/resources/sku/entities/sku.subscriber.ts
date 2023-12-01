import {
  AfterInsert,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Sku } from './sku.entity';

@EventSubscriber()
export class SkuSubscriber implements EntitySubscriberInterface {
  listenTo() {
    return Sku;
  }

  @AfterInsert()
  afterInsert(event: InsertEvent<any>): void | Promise<any> {
    // TODO:
  }
}
