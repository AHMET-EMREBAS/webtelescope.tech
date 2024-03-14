import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { SampleModule, SampleSubscriber } from './__fileName__';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: './tmp/test/sample.sqlite',
      autoLoadEntities: true,
      subscribers: [SampleSubscriber],
      synchronize: true,
      dropSchema: true,
    }),
    SampleModule,
  ],
})
export class AppModule {}
