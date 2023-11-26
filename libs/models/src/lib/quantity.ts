import { QuantityModel } from '@webpackages/common';
import { BaseEntity } from './base';
import { Product } from './product';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Store } from './store';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty, PartialType } from '@nestjs/swagger';

@Entity()
export class Quantity
  extends BaseEntity
  implements QuantityModel<Product, Store>
{
  @Column({ type: 'numeric' })
  quantity!: number;

  @ManyToOne(() => Product, (p) => p.id, { eager: true })
  @JoinColumn()
  sku!: Product;

  @ManyToOne(() => Store, (p) => p.id, { eager: true })
  @JoinColumn()
  store!: Store;
}

@Exclude()
export class CreateQuantityDto
  implements Pick<QuantityModel<number, number>, 'quantity' | 'sku' | 'store'>
{
  @Expose()
  @ApiProperty({ type: 'integer', minimum: 1 })
  sku!: number;

  @Expose()
  @ApiProperty({ type: 'integer', minimum: 1 })
  store!: number;

  @Expose()
  @ApiProperty({ type: 'integer', minimum: 0 })
  quantity!: number;
}

@Exclude()
export class UpdateQuantityDto extends PartialType(CreateQuantityDto) {}
