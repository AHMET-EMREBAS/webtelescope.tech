import { SkuModel } from '@webpackages/common';
import { BaseEntity } from './base';
import { Product } from './product';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty, PartialType } from '@nestjs/swagger';

@Entity()
export class Sku extends BaseEntity implements SkuModel<Product> {
  @Column({ type: 'varchar', unique: true })
  name!: string;

  @Column({ type: 'varchar', unique: true })
  barcode!: string;

  @Column({ type: 'varchar' })
  description!: string;

  @ManyToOne(() => Product, (p) => p.id, { eager: true })
  @JoinColumn()
  product!: Product;
}

@Exclude()
export class CreateSkuDto
  implements
    Pick<SkuModel<number>, 'barcode' | 'name' | 'product' | 'description'>
{
  @Expose()
  @ApiProperty({ type: 'string', minLength: 3, maxLength: 50 })
  name!: string;

  @Expose()
  @ApiProperty({ type: 'string', minLength: 11, maxLength: 13 })
  barcode!: string;

  @Expose()
  @ApiProperty({ type: 'string', minLength: 3, maxLength: 50 })
  description!: string;

  @Expose()
  @ApiProperty({ type: 'string', minLength: 3, maxLength: 50 })
  product!: number;
}

@Exclude()
export class UpdateSkuDto extends PartialType(CreateSkuDto) {}
