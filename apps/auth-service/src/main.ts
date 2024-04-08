import {
  Module,
  OnModuleInit,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AccessPolicies, bootstrap } from '@webpackages/core';
import {
  AuthEntities,
  AuthModule,
  seedNewDatabase,
  seedSubs,
} from '@webpackages/auth';
import { InjectDataSource, TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { v4 } from 'uuid';
import { LogSubscriber, Sub, SubSubscriber } from '@webpackages/entity';
import { DataSource } from 'typeorm';

import { Request } from 'express';

const PUBLIC_RESOUCE_PATH = join(__dirname, 'public');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'main',
      type: 'better-sqlite3',
      database: join(__dirname, 'database', `auth-main.sqlite`),
      subscribers: [LogSubscriber, SubSubscriber],
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature(AuthEntities, 'main'),
    TypeOrmModule.forRootAsync({
      inject: ['REQUEST'],
      useFactory(req: Request) {
        const org = req.headers[AccessPolicies.X_ORGANIZATION];
        if (!org) {
          throw new UnprocessableEntityException(
            `${AccessPolicies.X_ORGANIZATION} must be provided!`
          );
        }
        return {
          type: 'better-sqlite3',
          database: join(__dirname, 'database', `auth-${org}.sqlite`),
          subscribers: [LogSubscriber, SubSubscriber],
          entities: AuthEntities,
        };
      },
    }),

    ServeStaticModule.forRoot({
      rootPath: PUBLIC_RESOUCE_PATH,
      serveRoot: '',
    }),
    AuthModule.configure({ secret: v4() }),
  ],
})
export class AppModule implements OnModuleInit {
  constructor(
    @InjectDataSource('main') private readonly datasource: DataSource
  ) {}
  async onModuleInit() {
    await seedNewDatabase(this.datasource);
    const subRepo = this.datasource.getRepository(Sub);
    await seedSubs(subRepo, [
      {
        username: 'root@webtelescope.tech',
        password: '!Password123.',
        organizationName: 'main',
        subType: { id: 1 },
      },
    ]);
  }
}

bootstrap({
  appDescription: 'Auth Service',
  appModule: AppModule,
  appName: 'AuthService',
  email: 'auth@webtelescope.tech',
  host: 'auth.webtelescope.tech',
  port: 3001,
  website: 'https://webtelescope.tech',
});
