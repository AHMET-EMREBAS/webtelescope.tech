import { Module } from '@webpackages/core';
import { ConfigModule } from '@webpackages/config';

import { AppController } from './app.controller';

@Module({
  imports: [ConfigModule],
  controllers: [AppController],
})
export class AppModule {}
