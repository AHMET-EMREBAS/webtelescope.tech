import { BadRequestException, Logger, Module } from '@nestjs/common';
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
        const logger = new Logger('TypeOrmModule.forRoot');

        try {
          const orgname = extractOrgnameFromHeader(req);
          logger.log(`Got organization name from header ${orgname}`);
          if (orgname === 'main') {
            await DatabaseFactory.createDatabaseIFNotExist(orgname);
          }

          const options = await factory.createTypeOrmOptions(orgname);
          logger.log('Created database options.');

          return options;
        } catch (err) {
          console.error(err);
          const errorMessage =
            'Something went wrong while creating your database!';
          logger.error(errorMessage);
          throw new BadRequestException(errorMessage);
        }
      },
    }),
    TypeOrmModule.forFeature([...AuthEntities]),
  ],

  exports: [TypeOrmModule.forFeature([...AuthEntities])],
})
export class AuthDatabaseModule {}
