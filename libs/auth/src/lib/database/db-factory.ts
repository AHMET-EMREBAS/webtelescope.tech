import { Injectable, Logger } from '@nestjs/common';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { AuthEntities } from './db.entities';
import {
  getDatabaseName,
  getDatabaseDirectory,
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
import { copyFileSync, existsSync, mkdirSync } from 'fs';
import { createResourcePermissions } from '@webpackages/core';

@Injectable()
export class DatabaseFactory implements TypeOrmOptionsFactory {
  private logger: Logger;
  private static logger: Logger;

  constructor() {
    this.logger = new Logger(DatabaseFactory.name);
    DatabaseFactory.logger = this.logger;
  }

  static options(database: string): BetterSqlite3ConnectionOptions {
    const result: BetterSqlite3ConnectionOptions = {
      type: 'better-sqlite3',
      database,
      entities: [...AuthEntities],
      subscribers: [SubSubscriber, LogSubscriber],
    };

    this.logger.debug(
      `Got Database Options : Scyn: ${result.synchronize}, Drop: ${
        result.dropSchema
      },database: ${database.split('/').pop()}`
    );

    return result;
  }

  options(database: string): BetterSqlite3ConnectionOptions {
    return DatabaseFactory.options(database);
  }

  isDatabaseExist(database: string) {
    return DatabaseFactory.isDatabaseExist(database);
  }

  createTypeOrmOptions(database: string): BetterSqlite3ConnectionOptions {
    if (this.isDatabaseExist(database)) {
      this.logger.debug(`Database ${database} exists`);
      const result: BetterSqlite3ConnectionOptions = this.options(database);

      return result;
    } else {
      this.logger.debug(`Database ${database} does not exist`);
      const result: BetterSqlite3ConnectionOptions = {
        ...this.options(getDatabaseName('ingore')),
        synchronize: true,
      };

      return result;
    }
  }

  static isDatabaseExist(database: string) {
    const result = existsSync(database);
    this.logger.debug(`Is database exist : ${result}`);
    return result;
  }

  /**
   * Create database by organization name
   * @param orgname
   * @returns
   */
  static async createDatabaseIFNotExist(orgname: string) {
    const logger = new Logger('Create Database IF Not Exist');
    if (this.isDatabaseExist(getDatabaseName(orgname))) {
      logger.debug(`Database ${orgname} exits`);
      return;
    }

    try {
      mkdirSync(getDatabaseDirectory(orgname));
      copyFileSync(getTemplateDatabaseName(), getDatabaseName(orgname));
      logger.debug(`Created database for ${orgname}`);
    } catch (err) {
      logger.error(`Could not create the database for ${orgname}`);
    }
  }

  /**
   * Create template database that contains required data
   */
  static async createDatabaseTemplate() {
    const ds = await new DataSource({
      ...this.options('not-required'),
      database: getTemplateDatabaseName(),
      entities: AuthEntities,
      subscribers: [LogSubscriber, SubSubscriber],
      synchronize: true,
      dropSchema: true,
    }).initialize();

    await ds.transaction(async (manager) => {
      this.logger.debug('Started transaction');
      // Seed Subscription Type
      const subTypeRepo = manager.getRepository(SubType);
      await manager.save(subTypeRepo.create({ subtype: 'Primary' }));
      await manager.save(subTypeRepo.create({ subtype: 'Basic' }));
      await manager.save(subTypeRepo.create({ subtype: 'Gold' }));
      await manager.save(subTypeRepo.create({ subtype: 'VIP' }));

      console.log(await subTypeRepo.find());

      this.logger.debug('Created default SubType items');
      // Seed Permissions
      const permissionRepo = manager.getRepository(Permission);
      const ADMIN_PERMISSION = await manager.save(
        permissionRepo.create({ permission: 'ADMIN' })
      );
      this.logger.debug('Created Admin Permission');
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
      this.logger.debug('Created default Permission items');

      // Seed role
      const roleRepo = manager.getRepository(Role);
      const ADMIN_ROLE = await manager.save(
        roleRepo.create({ role: 'ADMIN', permissions: [ADMIN_PERMISSION] })
      );
      this.logger.debug('Created Admin role');

      try {
        // Seed organization
        const orgRepo = manager.getRepository(Org);
        await orgRepo.save({
          orgname: 'Organization name',
        });

        this.logger.debug('Created the default Organization');
      } catch (err) {
        this.logger.debug(`Could not create the default Organization`);
      }

      // Seed User
      const userRepo = manager.getRepository(User);
      await userRepo.save({
        username: 'user@domain.com',
        password: '!Password123.',
        organization: { id: 1 },
        roles: [ADMIN_ROLE],
      });
      this.logger.debug('Created the default Admin User');

      const appRepo = manager.getRepository(App);
      const APP = await appRepo.save({ appName: 'auth' });
      this.logger.debug('Created default App');
      const scopeRepo = manager.getRepository(Scope);

      const SCOPE = await scopeRepo.save({ scope: 'AUTH' });

      this.logger.debug('Created default AUTH scope');

      const oauthRepo = manager.getRepository(OAuth);

      await oauthRepo.save({
        name: 'Auth application api key',
        app: APP,
        scopes: [SCOPE],
      });
      this.logger.debug('Created a sample OAuth item');
      this.logger.debug('Ended transaction');
    });

    await ds.destroy();
  }

  /**
   * Update the template database for the organization.
   * @param orgname
   * @param username
   * @param password
   */
  static async updateTemplateDatabaseForUser(
    orgname: string,
    username: string,
    password: string
  ) {
    const database = getDatabaseName(orgname);
    const ds = await new DataSource(this.options(database)).initialize();

    this.logger.debug('Established database connection.');
    const orgRepo = ds.getRepository(Org);
    this.logger.debug('Got organization repository');

    const foundOrg = await orgRepo.findOneByOrFail({ id: 1 });
    await orgRepo.update(foundOrg.id, { orgname: orgname });
    this.logger.debug(`Found the default organization data ${foundOrg.id}`);

    this.logger.debug('Updated the default organization data.');

    this.logger.debug('Got user repository');
    const userRepo = ds.getRepository(User);
    const foundUser = await userRepo.findOneByOrFail({ id: 1 });
    this.logger.debug('Found the default user data');

    const result = await userRepo.update(foundUser.id, { username, password });

    if (result.affected) {
      this.logger.debug(
        `Updated username ${username} and password ${password}. `
      );
    } else {
      this.logger.error('Cound not update the template username and password!');
    }

    await ds.destroy();
  }
}
