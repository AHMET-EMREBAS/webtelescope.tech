import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@webpackages/core';
import { Quantity } from '@webpackages/gen-entity';
import { QuantityController } from './quantity.controller';
import { QuantityService, QuantityViewService } from './quantity.service';
import { Sku, Store, QuantityView } from '@webpackages/gen-entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quantity, Sku, Store, QuantityView])],
  controllers: [QuantityController],
  providers: [QuantityService, QuantityViewService],
})
export class QuantityModule {}
