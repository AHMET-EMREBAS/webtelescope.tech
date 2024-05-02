import { Module } from '@nestjs/common';
import { ConfigModule } from '@webpackages/config';
import { SampleModule, TypeOrmModule } from '@webpackages/core';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'workout',
      username: 'postgres',
      password: 'password',
      autoLoadEntities: true,
      synchronize: true,
      dropSchema: true,
    }),
    SampleModule,
  ],
})
export class AppModule {}
