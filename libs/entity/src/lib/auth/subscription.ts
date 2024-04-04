import { ISubscription } from '@webpackages/model';
import { StringColumn, TimestampEntity, Entity } from '@webpackages/typeorm';

@Entity()
export class Subscription extends TimestampEntity implements ISubscription {
  @StringColumn() subscriptionName!: string;
  @StringColumn() description!: string;
}
