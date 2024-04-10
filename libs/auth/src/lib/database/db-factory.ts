import { Injectable, Logger } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { AuthEntities } from './db.entities';
import { createDatabaseName } from './db-name';
import { LogSubscriber, SubSubscriber } from '@webpackages/entity';
import { DataSource } from 'typeorm';
import { existsSync } from 'fs';
import { BetterSqlite3ConnectionOptions } from 'typeorm/driver/better-sqlite3/BetterSqlite3ConnectionOptions';

@Injectable()
export class DatabaseFactory implements TypeOrmOptionsFactory {
  private static logger = new Logger();
  static options(orgname: string): BetterSqlite3ConnectionOptions {
    return {
      type: 'better-sqlite3',
      database: createDatabaseName(orgname),
      entities: AuthEntities,
      subscribers: [SubSubscriber, LogSubscriber],
      fileMustExist: true,
    };
  }

  static datasource(orgname: string) {
    return new DataSource({
      ...this.options(orgname),
      fileMustExist: false,
    });
  }

  static isDatabaseExist(orgname: string) {
    return existsSync(createDatabaseName(orgname));
  }

  static async createDatabaseIFNotExist(orgname: string = 'main') {
    if (!this.isDatabaseExist(orgname)) {
      await new DataSource({
        ...this.options(orgname),
        fileMustExist: false,
        synchronize: true,
        dropSchema: true,
      }).initialize();
      this.logger.log(`${orgname} database is created.`);
      return true;
    }
    this.logger.error(`${orgname} database already exists!`);
    return false;
  }

  createTypeOrmOptions(
    orgname: string = 'main'
  ): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return DatabaseFactory.options(orgname);
  }
}
