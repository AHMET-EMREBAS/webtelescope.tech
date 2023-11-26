import { PriceModel } from '@webpackages/common';
import { BaseEntity } from './base';
import { PriceLevel } from './price-level';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Sku } from './sku';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty, PartialType } from '@nestjs/swagger';

@Entity()
export class Price extends BaseEntity implements PriceModel<PriceLevel, Sku> {
  @Column({ type: 'numeric' })
  price!: number;

  @Column({ type: 'numeric' })
  cost!: number;

  @ManyToOne(() => PriceLevel, (p) => p.id, { eager: true })
  @JoinColumn()
  priceLevel!: PriceLevel;

  @ManyToOne(() => Sku, (s) => s.id, { eager: true })
  @JoinColumn()
  sku!: Sku;
}

@Exclude()
export class CreatePriceDto
  implements
    Pick<PriceModel<number, number>, 'price' | 'cost' | 'priceLevel' | 'sku'>
{
  @Expose()
  @ApiProperty({ type: 'number', minimum: 0 })
  price!: number;

  @Expose()
  @ApiProperty({ type: 'number', minimum: 0 })
  cost!: number;

  @Expose()
  @ApiProperty({ type: 'integer', minimum: 1 })
  priceLevel!: number;

  @Expose()
  @ApiProperty({ type: 'integer', minimum: 1 })
  sku!: number;
}

@Exclude()
export class UpdatePriceDto extends PartialType(CreatePriceDto) {}
