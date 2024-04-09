/* eslint-disable @typescript-eslint/no-unused-vars */
import { DataSource, DataSourceOptions } from 'typeorm';
import { InjectDataSource, TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  Injectable,
  InternalServerErrorException,
  Provider,
  Type,
} from '@nestjs/common';
import { v4 } from 'uuid';

export const DATASOURCE_TOKEN = v4();

export abstract class DatabaseService {
  constructor(
    @InjectDataSource(DATASOURCE_TOKEN)
    protected readonly datasource: DataSource
  ) {}

  createDatabase(database: string): Promise<void> {
    throw new Error('Not implemented!');
  }

  async initialize(options: DataSourceOptions): Promise<DataSource> {
    return await new DataSource(options).initialize();
  }
}

@Injectable()
export class SqliteDatabaseService extends DatabaseService {
  override async createDatabase(database: string): Promise<void> {
    const ds = await new DataSource({
      type: 'better-sqlite3',
      database: database,
    }).initialize();
  }
}

@Injectable()
export class PostgresDatabaseService extends DatabaseService {
  override async createDatabase(database: string): Promise<void> {
    try {
      await this.datasource.query(`CREATE DATABASE ${database}`);
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException('Could not create your database!');
    }
  }
}

export function provideDatabaseService(
  service: Type<DatabaseService>
): Provider {
  return {
    provide: DatabaseService,
    useClass: service,
  };
}
