import {
  AfterInsert,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Category } from './category.entity';

@EventSubscriber()
export class CategorySubscriber implements EntitySubscriberInterface {
  listenTo() {
    return Category;
  }

  @AfterInsert()
  afterInsert(event: InsertEvent<any>): void | Promise<any> {
    // TODO:
  }
}
