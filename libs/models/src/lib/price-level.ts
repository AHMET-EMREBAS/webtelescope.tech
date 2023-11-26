import { PriceLevelModel } from '@webpackages/common';
import { BaseEntity } from './base';
import { Column, Entity } from 'typeorm';

@Entity()
export class PriceLevel extends BaseEntity implements PriceLevelModel {
  @Column({ type: 'varchar', unique: true })
  name!: string;
}
