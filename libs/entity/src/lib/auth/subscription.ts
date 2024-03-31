import { ISubscription } from '@webpackages/model';
import {
  NameColumn,
  TextColumn,
  TimestampEntity,
  Entity,
} from '@webpackages/typeorm';

@Entity()
export class Subscription extends TimestampEntity implements ISubscription {
  @NameColumn() subscriptionName!: string;
  @TextColumn() description!: string;
}
