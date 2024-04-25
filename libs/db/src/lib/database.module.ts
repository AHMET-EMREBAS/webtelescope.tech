import { Module, Type, TypeOrmModule } from '@webpackages/core';
import { __databaseName } from './database-manager';

@Module({})
export class DatabaseModule {
  static forRoot(databaseFolderName: string) {
    return TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: __databaseName(databaseFolderName, 'orgs', 'root'),
      autoLoadEntities: true,
    });
  }

  static forFeature(entities: Type[]) {
    return TypeOrmModule.forFeature(entities);
  }
}
