import { join } from 'path';
import { Type, DataSource } from '@webpackages/core';
import { copyFileSync } from 'fs';

export function __validateDBName(name: string) {
  if (name.replace('-', 'QQAAWWRR').match(/\W/))
    throw new Error('Not special char but -!');

  if (name.length > 30) throw new Error('Not more than 30 chars');
  if (name.length < 3) throw new Error('Not less than 3 chars');
}

export function dbnameForTemplate(template: string) {
  return join(__dirname, 'database', 'templates', template + '.sqlite');
}

export function dbnameForOrganization(orgname: string) {
  return join(__dirname, 'database', 'orgs', orgname + '.sqlite');
}

export class DatabaseManager {
  /**
   * Create organization database
   * @param database
   * @param entities
   * @returns
   */
  private __create(database: string, entities: Type[]) {
    return new DataSource({
      type: 'better-sqlite3',
      database,
      entities,
      synchronize: true,
      dropSchema: true,
    }).initialize();
  }

  private async __copy(template: string, database: string) {
    copyFileSync(template, database);
  }

  copyTemplate(template: string, orgname: string) {
    const templateDir = dbnameForTemplate(template);
    const orgnameDir = dbnameForOrganization(orgname);
    this.__copy(templateDir, orgnameDir);
  }

  async create(database: string, entities: Type[]) {
    __validateDBName(database);
    return this.__create(dbnameForOrganization(database), entities);
  }

  async source(database: string, entities: Type[] = []) {
    return new DataSource({
      type: 'better-sqlite3',
      database: dbnameForOrganization(database),
      entities,
    });
  }

  /**
   * Create template database
   * @param database
   * @param entities
   * @returns
   */
  async template(database: string, entities: Type[]) {
    __validateDBName(database);
    return this.__create(dbnameForTemplate(database), entities);
  }
}
