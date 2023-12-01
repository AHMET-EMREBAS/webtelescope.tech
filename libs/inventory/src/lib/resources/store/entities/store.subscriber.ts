import {
  AfterInsert,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Store } from './store.entity';

@EventSubscriber()
export class StoreSubscriber implements EntitySubscriberInterface {
  listenTo() {
    return Store;
  }

  @AfterInsert()
  afterInsert(event: InsertEvent<any>): void | Promise<any> {
    // TODO:
  }
}
