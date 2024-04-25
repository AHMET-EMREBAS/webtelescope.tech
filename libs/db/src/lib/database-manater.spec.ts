import { existsSync, renameSync, rmSync } from 'fs';
import {
  DatabaseManager,
  dbnameForOrganization,
  dbnameForTemplate,
} from './database-manager';
import { Column, Entity } from '@webpackages/core';
import { PrimaryGeneratedColumn } from 'typeorm';
import { join } from 'path';

@Entity()
class Sample {
  @PrimaryGeneratedColumn() id!: number;
  @Column({ type: 'string' }) name!: string;
}

describe('DatabaseManager', () => {
  const dbname = 'some';
  let dba: DatabaseManager;
  beforeAll(() => {
    dba = new DatabaseManager();
  });
  it('shold create database ', async () => {
    const result = await dba.create(dbname, [Sample]);

    expect(result).toBeTruthy();
    const databaseDir = dbnameForOrganization(dbname);
    expect(existsSync(databaseDir)).toBeTruthy();
  });

  it('shold create template database ', async () => {
    const result = await dba.template(dbname, [Sample]);
    expect(result).toBeTruthy();
    const databaseDir = dbnameForTemplate(dbname);
    expect(existsSync(databaseDir)).toBeTruthy();
  });

  it('should create a template and copy it to an organization', async () => {
    const templateName = 'new-template';
    const orgname = 'myorg';

    const templateSource = await dba.template(templateName, [Sample]);

    expect(templateSource).toBeTruthy();
    const templateDatabaseDir = dbnameForTemplate(templateName);
    expect(existsSync(templateDatabaseDir)).toBeTruthy();

    await templateSource.getRepository(Sample).save({ name: 'Hello' });

    const result = ' '.repeat(100000).split(' ').join('x ');
    console.log(result);

    dba.copyTemplate(templateName, orgname);

    const copiedOrgDir = dbnameForOrganization(orgname);

    expect(existsSync(copiedOrgDir)).toBeTruthy();

    const orgSource = await dba.source(orgname, [Sample]);
    const found = await orgSource
      .getRepository(Sample)
      .findOneBy({ name: 'Hello' });

    expect(found?.name).toBe('Hello');
  });

  afterAll(() => {
    rmSync(join(__dirname, 'database'));
  });
});
