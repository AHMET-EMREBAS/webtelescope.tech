import { Module } from '@nestjs/common';
import {
  CategoryModule,
  CustomerModule,
  OrderModule,
  PriceLevelModule,
  PriceModule,
  ProductModule,
  QuantityModule,
  SkuModule,
  StoreModule,
} from './resources';

@Module({
  imports: [
    CategoryModule,
    OrderModule,
    PriceModule,
    PriceLevelModule,
    ProductModule,
    QuantityModule,
    SkuModule,
    StoreModule,
    CustomerModule,
  ],
})
export class InventoryModule {}
