import {
  DynamicModule,
  Logger,
  Module,
  Type,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from 'express';
import { AuthNames } from '../auth';
import { copyFileSync, existsSync } from 'fs';
import { join } from 'path';

/**
 * Validate organization name
 * @param orgname
 * @returns
 */
export function validateOrThrow(orgname: string) {
  const placeHolder = 'YUYUQWSSWEHHFUWJSL';
  const first = orgname.replace('-', placeHolder);

  if (typeof orgname != 'string' || first.match(/\W/)) {
    throw new UnprocessableEntityException(
      `Orgname can contain - but not other special characters!`
    );
  }

  const second = orgname.replace(placeHolder, '-');

  if (second.length < 3 || second.length > 30) {
    throw new UnprocessableEntityException(
      `Organization name must be between 3 and 30 characters!`
    );
  }

  return;
}

/**
 * Create template database path
 * @param name
 * @returns
 */
export const templatePath = (name: string) => {
  validateOrThrow(name);
  const dbname = join(__dirname, 'database', 'templates', name + '.sqlite');
  return dbname;
};

/**
 * Create organization database path
 * @param name
 * @returns
 */
export function orgPath(name: string) {
  validateOrThrow(name);
  const dbname = join(__dirname, 'database', 'orgs', name, 'main.sqlite');
  return dbname;
}

/**
 * Copy template database to orgdatabase
 * @param orgname
 * @param templateName
 */
export function copyTemplateToOrg(orgname: string, templateName: string) {
  copyFileSync(templatePath(templateName), orgPath(orgname));
}

@Module({})
export class DatabaseModule {
  static logger = new Logger();

  static log(msg: string) {
    this.logger.debug(msg);
  }
  /**
   * Create a template database so you can use it for the new users
   * @returns
   */
  static template(name: string, entities: Type[]): DynamicModule {
    return {
      module: DatabaseModule,

      imports: [
        TypeOrmModule.forRoot({
          type: 'better-sqlite3',
          database: templatePath(name),
          entities,
          synchronize: true,
          dropSchema: true,
        }),
      ],
    };
  }

  public static root(): DynamicModule {
    console.log('Configuring root database config.........');
    return {
      module: DatabaseModule,

      imports: [
        TypeOrmModule.forRootAsync({
          inject: [REQUEST],
          useFactory(req: Request) {
            const orgname = req.headers[AuthNames.ORGNAME_HEADER] as string;

            console.log(`Creating database connection : `, orgname);

            const databasePath = orgPath(orgname);
            if (existsSync(databasePath)) {
              return {
                type: 'better-sqlite3',
                database: databasePath,
                autoLoadEntities: true,
              };
            }

            throw new UnauthorizedException('You do not have a subscription!');
          },
        }),
      ],
    };
  }
}
