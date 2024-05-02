import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@webpackages/core';
import { ProductImg } from '@webpackages/gen-entity';
import { ProductImgController } from './product-img.controller';
import { ProductImgService } from './product-img.service';
import { Product, ProductImgView } from '@webpackages/gen-entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductImg, Product, ProductImgView])],
  controllers: [ProductImgController],
  providers: [ProductImgService],
})
export class ProductImgModule {}
