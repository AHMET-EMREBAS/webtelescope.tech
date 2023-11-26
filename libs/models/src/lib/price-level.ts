import { PriceLevelModel } from '@webpackages/common';
import { BaseEntity } from './base';
import { Column, Entity } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class PriceLevel extends BaseEntity implements PriceLevelModel {
  @Column({ type: 'varchar', unique: true })
  name!: string;
}

@Exclude()
export class CreatePriceLevelDto implements Pick<PriceLevelModel, 'name'> {
  @Expose()
  @ApiProperty({ type: 'string', minLength: 3, maxLength: 50 })
  name!: string;
}

@Exclude()
export class UpdatePriceLevelDto extends CreatePriceLevelDto {}
