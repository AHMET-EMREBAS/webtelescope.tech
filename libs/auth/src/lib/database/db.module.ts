import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { DatabaseFactory } from './db-factory';
import { AuthEntities } from './db.entities';
import { REQUEST } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { getDatabaseName } from './db-name';
import { AuthExtractService } from '../services';
import { IRequest } from '@webpackages/model';
@Module({
  imports: [
    ConfigModule.forFeature(() => ({})),
    TypeOrmModule.forRootAsync({
      inject: [REQUEST, DatabaseFactory],
      extraProviders: [DatabaseFactory],
      async useFactory(req: IRequest, factory: TypeOrmOptionsFactory) {
        const orgname =
          AuthExtractService.extractOrganizationNameFromHeader(req);
        const database = getDatabaseName(orgname);

        if (DatabaseFactory.isDatabaseExist(database)) {
          return factory.createTypeOrmOptions(database);
        }
        return factory.createTypeOrmOptions(getDatabaseName('ignore'));
      },
    }),
    TypeOrmModule.forFeature([...AuthEntities]),
  ],

  exports: [TypeOrmModule.forFeature([...AuthEntities])],
})
export class AuthDatabaseModule {}
