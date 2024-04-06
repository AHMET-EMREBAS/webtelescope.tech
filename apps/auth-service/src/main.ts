import { Module, OnModuleInit } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { bootstrap } from '@webpackages/core';
import {
  AuthEntities,
  AuthModule,
  createResoucePermissions,
  seedPermissions,
  seedRoles,
  seedSubTypes,
  seedSubs,
} from '@webpackages/auth';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { v4 } from 'uuid';
import {
  LogSubscriber,
  Permission,
  Role,
  Sub,
  SubSubscriber,
  SubType,
} from '@webpackages/entity';
import { Repository } from 'typeorm';

const PUBLIC_RESOUCE_PATH = join(__dirname, 'public');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: join(__dirname, 'auth.sqlite'),
      subscribers: [LogSubscriber, SubSubscriber],
      autoLoadEntities: true,
      synchronize: true,
      dropSchema: true,
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
    @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepo: Repository<Permission>,
    @InjectRepository(Sub) private readonly subRepo: Repository<Sub>,
    @InjectRepository(SubType) private readonly subTypeRepo: Repository<SubType>
  ) {}
  async onModuleInit() {
    const ADMIN_ROLE_NAME = 'ADMIN';

    await seedPermissions(this.permissionRepo, [
      { permission: ADMIN_ROLE_NAME },
    ]);

    const ADMIN_PERMISSION = await this.permissionRepo.findOneBy({
      permission: ADMIN_ROLE_NAME,
    });

    await seedRoles(this.roleRepo, [
      {
        role: ADMIN_ROLE_NAME,
        permissions: [ADMIN_PERMISSION],
      },
    ]);

    await seedPermissions(this.permissionRepo, [
      ...AuthEntities.map((e) => createResoucePermissions(e.name)).flat(),
    ]);

    await seedSubTypes(this.subTypeRepo, [
      { subscriptionName: 'default', description: 'Default sub type' },
    ]);

    const defaultSubType = await this.subTypeRepo.findOneBy({
      subscriptionName: 'default',
    });

    await seedSubs(this.subRepo, [
      {
        username: 'root@webtelescope.tech',
        password: '!Password123.',
        organizationName: 'WebTelescope',
        subType: defaultSubType,
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
  port: 3000,
  website: 'https://webtelescope.tech',
});
