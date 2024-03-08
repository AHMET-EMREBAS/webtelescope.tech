import { Module } from '@nestjs/common';
import { SampleModule } from './sample.resource';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: './temp/database.sample.sqlite',
      autoLoadEntities: true,
      synchronize: true,
      dropSchema: true,
    }),
    SampleModule,
  ],
})
export class AppModule {}
