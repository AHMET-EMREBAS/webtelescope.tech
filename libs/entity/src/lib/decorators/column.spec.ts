/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnOptions as CO, Column, Entity } from './column-and-entity';
import { DataSource } from 'typeorm';
import { BaseEntity } from './../base';
import { PropertyType as PT } from '@webpackages/common';

async function getRepo(type: string, options: any) {
  @Entity()
  class Sample extends BaseEntity {
    @Column(options) value!: any;
  }
  const ds = await new DataSource({
    type: 'better-sqlite3',
    database: `./tmp/test/${type}-column.sqlite`,
    entities: [Sample],
    dropSchema: true,
    synchronize: true,
  }).initialize();

  const repo = ds.getRepository(Sample);
  return repo;
}
describe('Column', () => {
  it.each`
    type                    | options                      | value
    ${'string' as PT}       | ${{ type: 'string' } as CO}  | ${'text value'}
    ${'number' as PT}       | ${{ type: 'number' } as CO}  | ${1}
    ${'boolean' as PT}      | ${{ type: 'boolean' } as CO} | ${true}
    ${'date' as PT}         | ${{ type: 'date' } as CO}    | ${new Date('10/10/1990 10:10:00 PM')}
    ${'object' as PT}       | ${{ type: 'object' } as CO}  | ${{ some: 'some' }}
    ${'array object' as PT} | ${{ type: 'object' } as CO}  | ${[{ some: 'some' }]}
  `('should define $type column', async ({ type, options, value }) => {
    const repo = await getRepo(type, options);

    const saved = await repo.save({ value });

    expect(saved.id).toBeDefined();
    expect(saved.createdAt).toBeDefined();
    expect(saved.updatedAt).toBeDefined();
    expect(saved.active).toBeDefined();
    expect(saved.value.toString()).toBe(value.toString());

    const found = await repo.findOneBy({ value: value });

    expect(found).not.toBeUndefined();

    if (found) {
      expect(found.id).toBeDefined();
      expect(found.createdAt).toBeDefined();
      expect(found.updatedAt).toBeDefined();
      expect(found.active).toBeDefined();
      expect(found.value.toString()).toBe(value.toString());
    }
  });

  it('should allow nullable column', async () => {
    const repo = await getRepo('nullable', { type: 'string' });
    const saved = await repo.save({});
    expect(saved).toBeDefined();
  });

  it('should check required column', async () => {
    const repo = await getRepo('required', { type: 'string', required: true });
    const saveItem = async () => await repo.save({});

    expect(saveItem).rejects.toThrow();
  });

  it('should check unique column', async () => {
    const repo = await getRepo('unique', { type: 'string', unique: true });
    await repo.save({ value: 'value' });
    const saveTheSameItem = async () => await repo.save({ value: 'value' });
    expect(saveTheSameItem).rejects.toThrow();
  });
});
