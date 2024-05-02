import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@webpackages/core';
import { Cart } from '@webpackages/gen-entity';
import { CartController } from './cart.controller';
import { CartService, CartViewService } from './cart.service';
import { Customer, User, Store, CartView } from '@webpackages/gen-entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, Customer, User, Store, CartView])],
  controllers: [CartController],
  providers: [CartService, CartViewService],
})
export class CartModule {}
