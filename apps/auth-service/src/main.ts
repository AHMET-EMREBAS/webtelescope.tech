import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { bootstrap } from '@webpackages/core';
import { AuthModule } from '@webpackages/auth';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { v4 } from 'uuid';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: join(__dirname, 'auth.sqlite'),
      autoLoadEntities: true,
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'public'),
      serveRoot: '',
    }),
    AuthModule.configure({
      secret: v4(),
    }),
  ],
})
export class AppModule {}

bootstrap({
  appDescription: 'Auth Service',
  appModule: AppModule,
  appName: 'AuthService',
  email: 'auth@webtelescope.tech',
  host: 'auth.webtelescope.tech',
  port: 3000,
  website: 'https://webtelescope.tech',
});
