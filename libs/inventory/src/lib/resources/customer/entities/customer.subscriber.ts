import {
  AfterInsert,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Customer } from './customer.entity';

@EventSubscriber()
export class CustomerSubscriber implements EntitySubscriberInterface {
  listenTo() {
    return Customer;
  }

  @AfterInsert()
  afterInsert(event: InsertEvent<any>): void | Promise<any> {
    // TODO:
  }
}
