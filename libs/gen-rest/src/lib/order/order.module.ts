import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@webpackages/core';
import { Order } from '@webpackages/gen-entity';
import { OrderController } from './order.controller';
import { OrderService, OrderViewService } from './order.service';
import { Sku, Cart, OrderView } from '@webpackages/gen-entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Sku, Cart, OrderView])],
  controllers: [OrderController],
  providers: [OrderService, OrderViewService],
})
export class OrderModule {}
