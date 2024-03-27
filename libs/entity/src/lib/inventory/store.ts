import { Entity } from 'typeorm';
import { OneRelation, TextColumn, TimestampEntity } from '../common';
import { IStore } from '@webpackages/model';
import { PriceLevel } from './price-level';

@Entity()
export class Store extends TimestampEntity implements IStore<PriceLevel> {
  @TextColumn() storeName!: string;
  @OneRelation(PriceLevel) priceLevel!: PriceLevel;
}
