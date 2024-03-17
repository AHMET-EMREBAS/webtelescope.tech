import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SampleModule } from './sample';
import { TodoModule } from './todo';
import { AuthModule } from '@webpackages/core';
import { Todo } from './todo/entity';
import { Sample } from './sample/entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: './tmp/app.sqlite',
      autoLoadEntities: true,
      synchronize: true,
      dropSchema: true,
    }),
    AuthModule.configure({
      resourceEntities: [Todo, Sample],
      roleNames: ['admin', 'product-editor'],
      root: {
        username: 'root@webtelescope.tech',
        password: '!Password1',
      },
    }),
    TodoModule,
    SampleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
