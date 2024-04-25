import { Module } from '@webpackages/core';
import { ConfigModule } from '@webpackages/config';

import { AppController } from './app.controller';
import { DatabaseModule } from '@webpackages/db';

@Module({
  imports: [ConfigModule, DatabaseModule.forRoot('database')],
  controllers: [AppController],
})
export class AppModule {}
