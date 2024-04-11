import { BadRequestException, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { DatabaseFactory } from './db-factory';
import { AuthEntities } from './db.entities';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { extractOrgnameFromHeader } from '../common';
import { ConfigModule } from '@nestjs/config';
import { getDatabaseName } from './db-name';

@Module({
  imports: [
    ConfigModule.forFeature(() => ({})),
    TypeOrmModule.forRootAsync({
      inject: [REQUEST, DatabaseFactory],
      extraProviders: [DatabaseFactory],
      async useFactory(req: Request, factory: TypeOrmOptionsFactory) {
        try {
          const orgname = extractOrgnameFromHeader(req);
          const database = getDatabaseName(orgname);
          if (orgname === 'main') {
            await DatabaseFactory.createDatabaseIFNotExist(database);
            return DatabaseFactory.options(database);
          }
          return await factory.createTypeOrmOptions(database);
        } catch (err) {
          throw new BadRequestException(
            'Something went wrong while creating your database!'
          );
        }
      },
    }),
    TypeOrmModule.forFeature([...AuthEntities]),
  ],

  exports: [TypeOrmModule.forFeature([...AuthEntities])],
})
export class AuthDatabaseModule {}
