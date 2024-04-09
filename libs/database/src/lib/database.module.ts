import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  DATASOURCE_TOKEN,
  DatabaseService,
  PostgresDatabaseService,
  SqliteDatabaseService,
  provideDatabaseService,
} from './database.service';

export type DatabaseModuleOptions = {
  type: 'better-sqlite3' | 'postgres';
  username: string;
  password: string;
  database: string;
};

@Module({})
export class DatabaseModule {
  static configure(options: DatabaseModuleOptions): DynamicModule {
    const { type, username, password } = options;

    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRoot({
          name: DATASOURCE_TOKEN,
          type,
          username,
          password,
        }),
      ],
      providers: [
        provideDatabaseService(
          type == 'postgres' ? PostgresDatabaseService : SqliteDatabaseService
        ),
      ],
      exports: [DatabaseService],
    };
  }
}
