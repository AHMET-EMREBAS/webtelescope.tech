import {
  OneRelation,
  TimestampEntity,
  Entity,
  UniqueNameColumn,
} from '@webpackages/typeorm';
import { IStore } from '@webpackages/model';
import { PriceLevel } from './price-level';

@Entity()
export class Store extends TimestampEntity implements IStore<PriceLevel> {
  @UniqueNameColumn() storeName!: string;
  @OneRelation(PriceLevel) priceLevel!: PriceLevel;
}
