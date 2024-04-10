import { Injectable, Logger } from '@nestjs/common';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { AuthEntities } from './db.entities';
import { getDatabaseName, getTemplateDatabaseName } from './db-name';
import {
  LogSubscriber,
  Organization,
  Permission,
  Role,
  SubSubscriber,
  SubType,
  User,
} from '@webpackages/entity';
import { copyFileSync, existsSync } from 'fs';
import { DataSource } from 'typeorm';
import { BetterSqlite3ConnectionOptions } from 'typeorm/driver/better-sqlite3/BetterSqlite3ConnectionOptions';
import { createResourcePermissions } from '@webpackages/core';

@Injectable()
export class DatabaseFactory implements TypeOrmOptionsFactory {
  private static logger = new Logger();

  static options(database: string): BetterSqlite3ConnectionOptions {
    return {
      type: 'better-sqlite3',
      database,
      entities: AuthEntities,
      subscribers: [SubSubscriber, LogSubscriber],
    };
  }

  createTypeOrmOptions(orgname = 'main'): BetterSqlite3ConnectionOptions {
    if (DatabaseFactory.isDatabaseExist(orgname)) {
      return {
        ...DatabaseFactory.options(getDatabaseName(orgname)),
      };
    }
    return {
      ...DatabaseFactory.options(getDatabaseName('ingore')),
      synchronize: true,
      dropSchema: true,
    };
  }

  static isDatabaseExist(orgname: string) {
    return existsSync(getDatabaseName(orgname));
  }

  static async createDatabaseIFNotExist(orgname: string = 'main') {
    if (!this.isDatabaseExist(orgname)) {
      try {
        copyFileSync(getTemplateDatabaseName(), getDatabaseName(orgname));
      } catch (err) {
        console.error(err);
      }
    }
  }

  /**
   * Create template database that contains required data
   */
  static async createDatabaseTemplate() {
    const ds = await new DataSource({
      ...DatabaseFactory.options(getTemplateDatabaseName()),
      synchronize: true,
      dropSchema: true,
    }).initialize();

    ds.transaction(async (manager) => {
      // Seed Subscription Type
      const subTypeRepo = manager.getRepository(SubType);
      await manager.save(subTypeRepo.create({ subscriptionName: 'Primary' }));
      await manager.save(subTypeRepo.create({ subscriptionName: 'Basic' }));
      await manager.save(subTypeRepo.create({ subscriptionName: 'Gold' }));
      await manager.save(subTypeRepo.create({ subscriptionName: 'VIP' }));

      // Seed Permissions
      const permissionRepo = manager.getRepository(Permission);
      const ADMIN_PERMISSION = await manager.save(
        permissionRepo.create({ permission: 'ADMIN' })
      );

      const builtinPermissions = AuthEntities.map((e) => {
        return createResourcePermissions(e.name);
      }).flat();
      await manager.save(
        builtinPermissions.map((permission) =>
          permissionRepo.create({ permission })
        )
      );

      // Seed role
      const roleRepo = manager.getRepository(Role);
      const ADMIN_ROLE = await manager.save(
        roleRepo.create({ role: 'ADMIN', permissions: [ADMIN_PERMISSION] })
      );

      // Seed organization
      const orgRepo = manager.getRepository(Organization);
      const ORGANIZATION = await orgRepo.save({ organizationName: 'Org Name' });

      const userRepo = manager.getRepository(User);
      await userRepo.save({
        username: 'user@domain.com',
        password: '!Password123.',
        organization: ORGANIZATION,
        roles: [ADMIN_ROLE],
      });
    });
  }

  static async updateAdminUserOfClientDatabase(
    organizationName: string,
    username: string,
    password: string
  ) {
    const dbname = getDatabaseName(organizationName);

    const ds = await new DataSource(this.options(dbname)).initialize();

    const orgRepo = ds.getRepository(Organization);
    const userRepo = ds.getRepository(User);

    const orgs = await orgRepo.find({ take: 1 });

    await orgRepo.update(orgs[0].id, { organizationName });

    const users = await userRepo.find({ take: 1 });
    await userRepo.update(users[0].id, { username, password });
  }
}
