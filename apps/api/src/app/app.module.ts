import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  CreateCategoryDto,
  Category,
  RestModule,
  UpdateCategoryDto,
} from '@webpackages/core';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'tmp/database.sqlite',
      autoLoadEntities: true,
      synchronize: true,
      dropSchema: true,
    }),
    RestModule.register({
      singularPath: 'category',
      pluralPath: 'categories',
      entities: [Category],
      createDto: CreateCategoryDto,
      updateDto: UpdateCategoryDto,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
