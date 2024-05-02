import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@webpackages/config';
import * as Modules from '@webpackages/gen-rest';

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
    ...Object.values(Modules).filter((e) => e.name.endsWith('Module')),
  ],
})
export class AppModule {}
