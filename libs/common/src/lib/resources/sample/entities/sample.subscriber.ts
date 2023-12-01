import {
  AfterInsert,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Sample } from './sample.entity';

@EventSubscriber()
export class SampleSubscriber implements EntitySubscriberInterface {
  listenTo() {
    return Sample;
  }

  @AfterInsert()
  afterInsert(event: InsertEvent<any>): void | Promise<any> {
    // TODO:
  }
}
