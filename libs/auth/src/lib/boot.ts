import {
  Module,
  OnModuleInit,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AccessPolicies, BootstrapOptions, bootstrap } from '@webpackages/core';
import {
  InjectDataSource,
  TypeOrmModule,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { join } from 'path';
import { v4 } from 'uuid';
import { LogSubscriber, Sub, SubSubscriber } from '@webpackages/entity';
import { DataSource, DataSourceOptions } from 'typeorm';

import { Request } from 'express';
import { AuthEntities } from './auth-entities';
import { AuthModule } from './auth.module';
import { seedNewDatabase } from './create-user-database';
import { seedSubs } from './seeder';
import { existsSync } from 'fs';

const PUBLIC_RESOUCE_PATH = join(__dirname, 'public');
const mainDatabasePath = join(__dirname, 'database', `auth-main.sqlite`);

const mainDatabaseOptions: DataSourceOptions = {
  name: 'main',
  type: 'better-sqlite3',
  database: mainDatabasePath,
  subscribers: [LogSubscriber, SubSubscriber],
  entities: AuthEntities,
};

@Module({
  imports: [
    TypeOrmModule.forRoot(mainDatabaseOptions),
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

export async function bootAuthModule(
  options: Omit<BootstrapOptions, 'appModule'>
) {
  if (!existsSync(mainDatabasePath)) {
    await new DataSource({
      ...mainDatabaseOptions,
      synchronize: true,
      dropSchema: true,
    }).initialize();
  }
  await bootstrap({
    appModule: AppModule,
    ...options,
  });
}
