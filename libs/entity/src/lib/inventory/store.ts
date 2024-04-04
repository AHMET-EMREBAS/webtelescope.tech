import {
  OneRelation,
  StringColumn,
  TimestampEntity,
  Entity,
} from '@webpackages/typeorm';
import { IStore } from '@webpackages/model';
import { PriceLevel } from './price-level';

@Entity()
export class Store extends TimestampEntity implements IStore<PriceLevel> {
  @StringColumn({ unique: true }) storeName!: string;
  @OneRelation(PriceLevel) priceLevel!: PriceLevel;
}
