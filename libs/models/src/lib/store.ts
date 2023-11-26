import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base';
import { PriceLevel } from './price-level';
import { StoreModel } from '@webpackages/common';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { MaxLength, Min, MinLength } from 'class-validator';

@Entity()
export class Store extends BaseEntity {
  @Column({ type: 'varchar', unique: true })
  name!: string;

  @ManyToOne(() => PriceLevel, (p) => p.id, { eager: true })
  @JoinColumn()
  priceLevel!: PriceLevel;
}

@Exclude()
export class CreateStoreDto
  implements Pick<StoreModel<number>, 'name' | 'priceLevel'>
{
  @Expose()
  @ApiProperty({ type: 'string', minLength: 3, maxLength: 50 })
  @MinLength(3)
  @MaxLength(50)
  name!: string;

  @Expose()
  @ApiProperty({ type: 'string', minimum: 1 })
  @Min(1)
  priceLevel!: number;
}

@Exclude()
export class UpdateStoreDto extends PartialType(CreateStoreDto) {}
