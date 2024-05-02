import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@webpackages/core';
import { Sale } from '@webpackages/gen-entity';
import { SaleController } from './sale.controller';
import { SaleService } from './sale.service';
import { Cart, Customer, SaleView } from '@webpackages/gen-entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sale, Cart, Customer, SaleView])],
  controllers: [SaleController],
  providers: [SaleService],
})
export class SaleModule {}
