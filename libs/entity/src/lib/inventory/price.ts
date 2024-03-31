import { IPrice } from '@webpackages/model';
import { Sku } from './sku';
import { PriceLevel } from './price-level';
import {
  NumberColumn,
  OwnerRelation,
  TimestampEntity,
  Entity,
} from '@webpackages/typeorm';

@Entity()
export class Price extends TimestampEntity implements IPrice<PriceLevel, Sku> {
  @NumberColumn() price!: number;
  @NumberColumn() cost!: number;

  @OwnerRelation(Sku) sku!: Sku;
  @OwnerRelation(PriceLevel) priceLevel!: PriceLevel;
}
