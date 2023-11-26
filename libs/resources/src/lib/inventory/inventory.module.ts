import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Category,
  Message,
  Permission,
  Price,
  PriceLevel,
  Product,
  ProductImage,
  ProductView,
  Quantity,
  Role,
  Sku,
  Store,
  User,
} from '@webpackages/models';
import {
  CategoryController,
  PermissionController,
  PriceController,
  PriceLevelController,
  ProductController,
  QuantityController,
  RoleController,
  SkuController,
  StoreController,
  UserController,
} from './controllers';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Category,
      Message,
      Permission,
      Price,
      PriceLevel,
      Product,
      ProductImage,
      ProductView,
      Quantity,
      Role,
      Sku,
      Store,
      User,
    ]),
  ],
  controllers: [
    CategoryController,
    PermissionController,
    PriceController,
    PriceLevelController,
    ProductController,
    QuantityController,
    RoleController,
    SkuController,
    StoreController,
    UserController,
  ],
})
export class InventoryModule {}
