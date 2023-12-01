import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@webpackages/auth';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { InventoryModule } from '@webpackages/inventory';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'tmp/database.sqlite',
      autoLoadEntities: true,
      synchronize: true,
      dropSchema: true,
    }),
    EventEmitterModule.forRoot(),
    AuthModule.register({
      username: 'root@root.com',
      password: 'Pass123!',
      secret: 'Secret',
      resources: [],
    }),
    InventoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
