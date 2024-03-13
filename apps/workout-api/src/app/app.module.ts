import { Module } from '@nestjs/common';

import { AppController, Sample } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: './tmp/test/sample.sqlite',
      entities: [Sample],
      synchronize: true,
      dropSchema: true,
    }),
    TypeOrmModule.forFeature([Sample]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
