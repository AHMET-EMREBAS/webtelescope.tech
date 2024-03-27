import { IPriceLevel } from '@webpackages/model';
import { IDEntity, NameColumn } from '../common';
import { Entity } from 'typeorm';

@Entity()
export class PriceLevel extends IDEntity implements IPriceLevel {
  @NameColumn() priceLevelName!: string;
}
