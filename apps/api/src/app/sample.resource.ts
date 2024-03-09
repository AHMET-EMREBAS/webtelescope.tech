import { Module } from '@nestjs/common';
import { PartialType } from '@nestjs/swagger';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  BaseEntity,
  Entity,
  NumberColumn,
  One,
  TextColumn,
  TextProperty,
  getResourceController,
} from '@webpackages/core';

@Entity()
export class Category extends BaseEntity {
  @TextColumn()
  name!: string;
}

@Entity()
export class Sample extends BaseEntity {
  @TextColumn()
  name!: string;

  @NumberColumn()
  age!: number;

  @One(Category)
  one?: Category;
}

@Dto()
export class CreateSampleDto implements Pick<Sample, 'name' | 'age'> {
  @TextProperty({ required: true })
  name: string;

  @NumberProperty({ required: true })
  age: number;
}

export class ReadSampleDto implements Sample {
  @NumberProperty() id: number;
  @DateProperty() createdAt: Date;
  @DateProperty() updatedAt: Date;
  @DateProperty() deletedAt: Date;
  @TextProperty() name: string;
  @TextProperty() age: number;
}

@Dto()
export class UdpateSampleDto extends PartialType(CreateSampleDto) {}

@Module({
  imports: [TypeOrmModule.forFeature([Sample, Category])],
  controllers: [
    getResourceController({
      entity: Sample,
      createDto: CreateSampleDto,
      updateDto: UdpateSampleDto,
      readDto: ReadSampleDto,
      singularPath: 'sample',
      pluralPath: 'samples',
    }),
    getResourceController({
      entity: Category,
      createDto: Category,
      updateDto: Category,
      readDto: Category,
      singularPath: 'category',
      pluralPath: 'categoryies',
    }),
  ],
})
export class SampleModule {}
