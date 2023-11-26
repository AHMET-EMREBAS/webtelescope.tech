import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppEventService } from './app-event.service';
import { AuthModule } from '@webpackages/auth';

@Module({
  imports: [
    EventEmitterModule.forRoot({ delimiter: '.' }),
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: './tmp/database.sqlite',
      autoLoadEntities: true,
      subscribers: [],
      synchronize: true,
      dropSchema: true,
    }),
    AuthModule.register({
      secret: 'secret',
      username: process.env.APP_USERNAME || 'root@root.com',
      password: process.env.APP_PASSWORD || 'Pass123!',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AppEventService],
})
export class AppModule {}
