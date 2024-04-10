import { BadRequestException, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { DatabaseFactory } from './db-factory';
import { AuthEntities } from './db.entities';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { extractOrgnameFromHeader } from '../common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forFeature(() => ({})),
    TypeOrmModule.forRootAsync({
      inject: [REQUEST, DatabaseFactory],
      extraProviders: [DatabaseFactory],
      async useFactory(req: Request, factory: TypeOrmOptionsFactory) {
        try {
          const orgname = extractOrgnameFromHeader(req);
          if (orgname === 'main') {
            await DatabaseFactory.createDatabaseIFNotExist(orgname);
          }
          return factory.createTypeOrmOptions(orgname);
        } catch (err) {
          console.error(err);
          throw new BadRequestException(
            'Something went wrong while creating your database!'
          );
        }
      },
    }),
    TypeOrmModule.forFeature(AuthEntities),
  ],
  exports: [TypeOrmModule.forFeature(AuthEntities)],
})
export class AuthDatabaseModule {}
