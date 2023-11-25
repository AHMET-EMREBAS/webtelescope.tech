import {
  AfterInsert,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Sample as EntityClass } from '../entity';

@EventSubscriber()
export class SampleSubscriber
  implements EntitySubscriberInterface<EntityClass>
{
  listenTo() {
    return EntityClass;
  }

  @AfterInsert()
  afterInsert(event: InsertEvent<EntityClass>): void | Promise<void> {
    console.log(`Saved ${event.entity}`);
  }
}
