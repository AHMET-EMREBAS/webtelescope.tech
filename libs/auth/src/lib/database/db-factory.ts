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
      `Got Database Options : Scyn: ${result.synchronize}  database: ${database}`
    );

    return result;
  }

  options(database: string): BetterSqlite3ConnectionOptions {
    return DatabaseFactory.options(database);
  }

  isDatabaseExist(database: string) {
    return DatabaseFactory.isDatabaseExist(database);
  }

  createTypeOrmOptions(orgname = 'main'): BetterSqlite3ConnectionOptions {
    let result: BetterSqlite3ConnectionOptions;

    if (this.isDatabaseExist(getDatabaseName(orgname))) {
      result = {
        ...this.options(getDatabaseName(orgname)),
      };
    }

    result = {
      ...this.options(getDatabaseName('ingore')),
      synchronize: true,
      dropSchema: true,
    };

    return result;
  }

  static isDatabaseExist(database: string) {
    const result = existsSync(database);
    this.logger.debug(`Is database exist : ${result}`);
    return result;
  }

  static async createDatabaseIFNotExist(orgname: string = 'main') {
    const logger = new Logger('Create Database IF Not Exist');
    if (!this.isDatabaseExist(getDatabaseName(orgname))) {
      try {
        mkdirSync(getDatabaseDirectory(orgname));
        copyFileSync(getTemplateDatabaseName(), getDatabaseName(orgname));
        logger.debug(`Created database for ${orgname}`);
      } catch (err) {
        logger.error(`Could not create the database for ${orgname}`);
      }
    }
  }

  /**
   * Create template database that contains required data
   */
  static async createDatabaseTemplate() {
    const ds = await new DataSource({
      ...this.options(''),
      database: getTemplateDatabaseName(),
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
  }

  static async updateTemplateDatabaseForUser(
    orgname: string,
    username: string,
    password: string
  ) {
    const ds = await new DataSource(
      this.options(getDatabaseName(orgname))
    ).initialize();

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
  }
}
