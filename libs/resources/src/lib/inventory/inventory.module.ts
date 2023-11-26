import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Category,
  Price,
  PriceLevel,
  Product,
  ProductView,
  Quantity,
  Store,
} from '@webpackages/models';
import { ProductController } from './product.controller';
import { CategoryController } from './category.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      Price,
      PriceLevel,
      Category,
      Price,
      Quantity,
      Store,
      ProductView,
    ]),
  ],
  controllers: [ProductController, CategoryController],
})
export class ProductModule {}
