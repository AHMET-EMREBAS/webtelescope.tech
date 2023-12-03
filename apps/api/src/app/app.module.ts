import { Module } from '@nestjs/common';
import {
  CreateCategoryDto,
  Category,
  RestModule,
  UpdateCategoryDto,
  AuthModule,
  Product,
  CreateProductDto,
  UpdateProductDto,
} from '@webpackages/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    EventEmitterModule.forRoot({ delimiter: '.' }),
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'tmp/database.sqlite',
      autoLoadEntities: true,
      synchronize: true,
      dropSchema: true,
    }),
    AuthModule.register({
      username: 'root@root.com',
      password: 'Pass123!',
      secret: 'Secret',
    }),
    RestModule.register({
      singularPath: 'category',
      pluralPath: 'categories',
      entities: [Category],
      createDto: CreateCategoryDto,
      updateDto: UpdateCategoryDto,
    }),
    RestModule.register({
      singularPath: 'product',
      pluralPath: 'products',
      entities: [Product],
      createDto: CreateProductDto,
      updateDto: UpdateProductDto,
    }),
  ],
})
export class AppModule {}
