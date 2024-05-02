import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@webpackages/core';
import { ProductReturn } from '@webpackages/gen-entity';
import { ProductReturnController } from './product-return.controller';
import {
  ProductReturnService,
  ProductReturnViewService,
} from './product-return.service';
import { Order, User, ProductReturnView } from '@webpackages/gen-entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductReturn, Order, User, ProductReturnView]),
  ],
  controllers: [ProductReturnController],
  providers: [ProductReturnService, ProductReturnViewService],
})
export class ProductReturnModule {}
