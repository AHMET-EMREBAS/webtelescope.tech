import {
  AfterInsert,
  BeforeInsert,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Sample } from './entity';

@EventSubscriber()
export class SampleSubscriber implements EntitySubscriberInterface<Sample> {
  @AfterInsert()
  afterInsert(event: InsertEvent<Sample>) {
    console.log('AfterInsert: ', event.entity);
  }

  @BeforeInsert()
  beforeInsert(event: InsertEvent<Sample>) {
    console.log('BeforeInsert: ', event.entity);
  }
}
