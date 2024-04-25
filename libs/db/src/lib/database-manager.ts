import { join } from 'path';
import { Type, DataSource, Injectable } from '@webpackages/core';
import { constants, copyFile } from 'fs/promises';
import { validateDatabaseName } from './name-validator';

export function __databaseName(
  databaseFolderName: string,
  groupFolderName: string,
  targetName: string
) {
  validateDatabaseName(databaseFolderName);
  validateDatabaseName(groupFolderName);
  validateDatabaseName(targetName);
  return join(
    __dirname,
    databaseFolderName,
    groupFolderName,
    targetName,
    'main.sqlite'
  );
}

@Injectable()
export class DatabaseManager {
  constructor(private readonly databaseFolderName: string) {
    validateDatabaseName(databaseFolderName);
  }
  /**
   * Create organization database
   * @param database
   * @param entities
   * @returns
   */
  private async __create(database: string, entities: Type[]) {
    const con = await new DataSource({
      type: 'better-sqlite3',
      database,
      entities,
      synchronize: true,
      dropSchema: true,
    }).initialize();

    await con.destroy();
    return;
  }
  tempDBNAME(template: string) {
    return __databaseName(this.databaseFolderName, 'templates', template);
  }

  orgDBNAME(orgname: string) {
    return __databaseName(this.databaseFolderName, 'orgs', orgname);
  }

  private async __copy(template: string, database: string) {
    await copyFile(template, database, constants.COPYFILE_EXCL);
  }

  async copyTemplate(template: string, orgname: string) {
    const templateDir = this.tempDBNAME(template);
    const orgnameDir = this.orgDBNAME(orgname);
    await this.__copy(templateDir, orgnameDir);
  }

  async create(database: string, entities: Type[]) {
    validateDatabaseName(database);
    return this.__create(this.orgDBNAME(database), entities);
  }

  async templateSource(databaseName: string, entities: Type[]) {
    const database = this.tempDBNAME(databaseName);
    return await new DataSource({
      type: 'better-sqlite3',
      database,
      entities,
    }).initialize();
  }

  async source(databaseName: string, entities: Type[]) {
    const database = this.orgDBNAME(databaseName);
    return await new DataSource({
      type: 'better-sqlite3',
      database,
      entities,
    }).initialize();
  }

  /**
   * Create template database
   * @param database
   * @param entities
   * @returns
   */
  async template(database: string, entities: Type[]) {
    validateDatabaseName(database);
    return this.__create(this.tempDBNAME(database), entities);
  }
}
