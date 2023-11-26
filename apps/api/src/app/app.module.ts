import { Module } from '@nestjs/common';
import {
  Product,
  ProductView,
  Category,
  Price,
  Quantity,
  Store,
  PriceLevel,
  Message,
  Permission,
  ProductImage,
  Role,
  User,
  Sku,
} from '@webpackages/models';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    EventEmitterModule.forRoot({ delimiter: '.' }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      username: 'devdb',
      password: 'devdb',
      database: 'devdb',
      autoLoadEntities: true,
      synchronize: true,
      dropSchema: true,
    }),
    TypeOrmModule.forFeature([
      Product,
      ProductView,
      Category,
      Price,
      Quantity,
      Store,
      PriceLevel,
      Message,
      Permission,
      ProductImage,
      Role,
      User,
      Sku,
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
