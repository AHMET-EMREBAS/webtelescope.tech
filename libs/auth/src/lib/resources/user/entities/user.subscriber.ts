import {
  AfterInsert,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { User } from './user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface {
  listenTo() {
    return User;
  }

  @AfterInsert()
  afterInsert(event: InsertEvent<any>): void | Promise<any> {
    // TODO:
  }
}
