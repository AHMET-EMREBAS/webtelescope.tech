import { CategoryModel } from '@webpackages/common';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Category extends BaseEntity implements CategoryModel {
  @Column({ type: 'varchar', unique: true })
  name!: string;
}
@Exclude()
export class CreateCategoryDto implements Pick<CategoryModel, 'name'> {
  @Expose()
  @ApiProperty({ type: 'string', minLength: 3, maxLength: 50 })
  name!: string;
}

@Exclude()
export class UpdateCategoryDto extends CreateCategoryDto {}
