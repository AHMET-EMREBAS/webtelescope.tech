import { Injectable, Logger } from '@nestjs/common';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { AuthEntities } from './db.entities';
import {
  getDatabaseDirectory,
  getDatabaseName,
  getTemplateDatabaseName,
} from './db-name';
import {
  App,
  LogSubscriber,
  OAuth,
  Org,
  Permission,
  Role,
  Scope,
  SubSubscriber,
  SubType,
  User,
} from '@webpackages/entity';

import { DataSource } from 'typeorm';
import { BetterSqlite3ConnectionOptions } from 'typeorm/driver/better-sqlite3/BetterSqlite3ConnectionOptions';
import { createResourcePermissions } from '@webpackages/core';
import { copyFileSync, existsSync, mkdirSync } from 'fs';

@Injectable()
export class DatabaseFactory implements TypeOrmOptionsFactory {
  static options(database: string): BetterSqlite3ConnectionOptions {
    return {
      type: 'better-sqlite3',
      database,
      entities: [...AuthEntities],
      subscribers: [SubSubscriber, LogSubscriber],
    };
  }

  options(database: string): BetterSqlite3ConnectionOptions {
    return DatabaseFactory.options(database);
  }

  isDatabaseExist(database: string) {
    return DatabaseFactory.isDatabaseExist(database);
  }

  createTypeOrmOptions(orgname = 'main'): BetterSqlite3ConnectionOptions {
    if (this.isDatabaseExist(getDatabaseName(orgname))) {
      return {
        ...this.options(getDatabaseName(orgname)),
      };
    }
    return {
      ...this.options(getDatabaseName('ingore')),
      synchronize: true,
      dropSchema: true,
    };
  }

  static isDatabaseExist(database: string) {
    return existsSync(database);
  }

  static async createDatabaseIFNotExist(orgname: string = 'main') {
    if (!this.isDatabaseExist(getDatabaseName(orgname))) {
      try {
        mkdirSync(getDatabaseDirectory(orgname));
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
    const logger = new Logger('Create Database Template');
    const ds = await new DataSource({
      ...this.options(''),
      database: getTemplateDatabaseName(),
      synchronize: true,
      dropSchema: true,
    }).initialize();

    await ds.transaction(async (manager) => {
      logger.log('--------------started-------------------');
      // Seed Subscription Type
      const subTypeRepo = manager.getRepository(SubType);
      await manager.save(subTypeRepo.create({ subname: 'Primary' }));
      await manager.save(subTypeRepo.create({ subname: 'Basic' }));
      await manager.save(subTypeRepo.create({ subname: 'Gold' }));
      await manager.save(subTypeRepo.create({ subname: 'VIP' }));

      logger.log('created sub types...');
      // Seed Permissions
      const permissionRepo = manager.getRepository(Permission);
      const ADMIN_PERMISSION = await manager.save(
        permissionRepo.create({ permission: 'ADMIN' })
      );
      logger.log('created admin permission...');

      const builtinPermissions = [...AuthEntities]
        .map((e) => {
          return createResourcePermissions(e.name);
        })
        .flat();

      await manager.save(
        builtinPermissions.map((permission) =>
          permissionRepo.create({ permission })
        )
      );
      logger.log('created built-in permissions...');

      // Seed role
      const roleRepo = manager.getRepository(Role);
      const ADMIN_ROLE = await manager.save(
        roleRepo.create({ role: 'ADMIN', permissions: [ADMIN_PERMISSION] })
      );
      logger.log('created admin role...');

      try {
        // Seed organization
        const orgRepo = manager.getRepository(Org);
        const ORG = await orgRepo.save({
          orgname: 'Organization name',
        });

        logger.log('created organization...');
      } catch (err) {
        logger.error('could not create the organization!');
      }

      // Seed User
      const userRepo = manager.getRepository(User);
      await userRepo.save({
        username: 'user@domain.com',
        password: '!Password123.',
        organization: { id: 1 },
        roles: [ADMIN_ROLE],
      });
      logger.log('created admin user...');

      const appRepo = manager.getRepository(App);
      const APP = await appRepo.save({ appName: 'auth' });
      logger.log('created app...');
      const scopeRepo = manager.getRepository(Scope);
      const SCOPE = await scopeRepo.save({ scope: 'AUTH' });
      logger.log('created scope...');

      const oauthRepo = manager.getRepository(OAuth);
      await oauthRepo.save({
        name: 'Auth application api key',
        app: APP,
        scopes: [SCOPE],
      });
      logger.log('created sample oauth key...');
      logger.log('----------------ended-------------------');
    });
  }

  static async updateTemplateDatabaseForUser(
    organizationName: string,
    username: string,
    password: string
  ) {
    const logger = new Logger('Update User Database');

    logger.log(`Updating ${organizationName}, ${username},${password}`);
    const ds = new DataSource(this.options(getDatabaseName(organizationName)));

    logger.log('Established database connection.');
    const orgRepo = ds.getRepository(Org);
    logger.log('Got organization repository');
    const orgs = await orgRepo.find();
    logger.log('Found the default organization data');

    await orgRepo.update(orgs[0].id, { orgname: organizationName });
    logger.log('Updated the default organization data.');

    logger.log('Got user repository');
    const userRepo = ds.getRepository(User);
    const users = await userRepo.find();
    logger.log('Found the default user data');
    await userRepo.update(users[0].id, { username, password });
    logger.log('Updated user data.');
  }
}
