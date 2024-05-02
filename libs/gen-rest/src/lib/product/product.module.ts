import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@webpackages/core';
import { Product } from '@webpackages/gen-entity';
import { ProductController } from './product.controller';
import { ProductService, ProductViewService } from './product.service';
import { Category, Department, ProductView } from '@webpackages/gen-entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category, Department, ProductView]),
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductViewService],
})
export class ProductModule {}
