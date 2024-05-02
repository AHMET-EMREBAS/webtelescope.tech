import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@webpackages/core';
import { Sku } from '@webpackages/gen-entity';
import { SkuController } from './sku.controller';
import { SkuService, SkuViewService } from './sku.service';
import { Product, SkuView } from '@webpackages/gen-entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sku, Product, SkuView])],
  controllers: [SkuController],
  providers: [SkuService, SkuViewService],
})
export class SkuModule {}
