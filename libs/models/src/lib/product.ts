import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base';
import { ProductModel } from '@webpackages/common';
import { Category } from './category';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { MinLength, MaxLength, IsOptional, Min } from 'class-validator';

@Entity()
export class Product extends BaseEntity implements ProductModel<Category> {
  @Column({ type: 'varchar', unique: true })
  name!: string;

  @Column({ type: 'varchar', unique: true })
  upc!: string;

  @Column({ type: 'varchar' })
  description!: string;

  @ManyToOne(() => Category, (c) => c.id, { eager: true })
  @JoinColumn()
  category!: Category;
}

@Exclude()
export class CreateProductDto
  implements
    Pick<ProductModel<number>, 'name' | 'description' | 'upc' | 'category'>
{
  @Expose()
  @ApiProperty({ type: 'string', minLength: 3, maxLength: 50 })
  @MinLength(3)
  @MaxLength(50)
  name!: string;

  @Expose()
  @ApiProperty({ type: 'string', minLength: 3, maxLength: 400 })
  @MinLength(3)
  @MaxLength(400)
  description!: string;

  @Expose()
  @ApiProperty({ type: 'string', minLength: 6, maxLength: 14 })
  @MinLength(6)
  @MaxLength(14)
  upc!: string;

  @Expose()
  @ApiProperty({ type: 'string' })
  @IsOptional()
  @Min(0)
  category!: number;
}

@Exclude()
export class UpdateProductDto extends PartialType(CreateProductDto) {}
