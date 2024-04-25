import { rmSync } from 'fs';
import { DatabaseManager } from './database-manager';
import { Column, Entity } from '@webpackages/core';
import { PrimaryGeneratedColumn } from 'typeorm';
import { join } from 'path';

@Entity()
class Sample {
  @PrimaryGeneratedColumn() id!: number;
  @Column({ type: 'string' }) name!: string;
}
const dbname = 'some';

describe('DatabaseManager', () => {
  let dba: DatabaseManager;
  beforeAll(() => {
    dba = new DatabaseManager('test');
  });
  it('shold create database ', async () => {
    await dba.create(dbname, [Sample]);

    const r = await dba.source(dbname, [Sample]);
    const repo = r.getRepository(Sample);
    expect(repo).toBeTruthy();

    await r.destroy();
  });

  it('shold create template database ', async () => {
    await dba.template(dbname, [Sample]);
    const r = await dba.source(dbname, [Sample]);
    const repo = r.getRepository(Sample);
    expect(repo).toBeTruthy();

    await r.destroy();
  });

  afterAll(() => {
    setTimeout(() => {
      rmSync(join(__dirname, 'test'), {
        recursive: true,
        retryDelay: 2000,
      });
    }, 4000);
  });
});
