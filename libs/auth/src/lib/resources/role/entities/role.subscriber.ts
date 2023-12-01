import {
  AfterInsert,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Role } from './role.entity';

@EventSubscriber()
export class RoleSubscriber implements EntitySubscriberInterface {
  listenTo() {
    return Role;
  }

  @AfterInsert()
  afterInsert(event: InsertEvent<any>): void | Promise<any> {
    // TODO:
  }
}
