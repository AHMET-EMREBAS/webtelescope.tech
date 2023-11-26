import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base';
import { PriceLevel } from './price-level';

@Entity()
export class Store extends BaseEntity {
  @Column({ type: 'varchar', unique: true })
  name!: string;

  @ManyToOne(() => PriceLevel, (p) => p.id, { eager: true })
  @JoinColumn()
  priceLevel!: PriceLevel;
}
