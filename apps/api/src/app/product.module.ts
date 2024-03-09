import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getResourceController } from '@webpackages/core';
import {
  CreateProductDto,
  Product,
  ProductView,
  UpdateProductDto,
  ReadProductDto,
} from '@webpackages/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductView])],
  controllers: [
    getResourceController({
      entity: Product,
      createDto: CreateProductDto,
      updateDto: UpdateProductDto,
      readDto: ReadProductDto,
      singularPath: 'sample',
      pluralPath: 'samples',
    }),
  ],
})
export class ProductModule {}
