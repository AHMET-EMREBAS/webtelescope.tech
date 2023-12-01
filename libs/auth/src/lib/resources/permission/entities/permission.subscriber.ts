import {
  AfterInsert,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Permission } from './permission.entity';

@EventSubscriber()
export class PermissionSubscriber implements EntitySubscriberInterface {
  listenTo() {
    return Permission;
  }

  @AfterInsert()
  async afterInsert(event: InsertEvent<any>): Promise<void> {
    // TODO:
  }
}
