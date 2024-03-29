import { ISubscription } from '@webpackages/model';
import { Entity } from 'typeorm';
import { NameColumn, TextColumn, TimestampEntity } from '../common';

@Entity()
export class Subscription extends TimestampEntity implements ISubscription {
  @NameColumn() subscriptionName!: string;
  @TextColumn() description!: string;
}
