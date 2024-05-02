/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import {
  DeepPartial,
  FindManyOptions,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class RepositoryService<T extends ObjectLiteral> extends Repository<T> {
  protected readonly uniqueColumns: (keyof T)[] =
    this.repository.metadata.ownUniques
      .map((e) => e.givenColumnNames)
      .flat() as (keyof T)[];

  constructor(protected readonly repository: Repository<T>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  /**
   * For all query operations use this method
   * @param query
   * @returns
   */
  async queryAll(query: FindManyOptions<T>) {
    return await this.repository.find(query);
  }

  /**
   * Check dublicate fields before saving
   * @param entity
   * @returns
   */
  async saveSafe(entity: DeepPartial<T>) {
    await this.valideUnique(entity);
    return await super.save(entity);
  }

  async updateSafe(id: number, entity: QueryDeepPartialEntity<T>) {
    await this.valideUnique({ id, ...entity });
    return super.update(id, entity);
  }
  async getMetadata(metadata: string) {
    switch (metadata) {
      case 'count':
        return await this.count();
      case 'columns':
        return this.metadata.columns.map((e) => e.propertyName);
      case 'uniques':
        return this.uniqueColumns;
      case 'relations':
        return this.metadata.relations.map((e) => e.propertyName);
    }
    throw new NotFoundException(`Metadata key, ${metadata} not found!`);
  }
  async valideUnique(entity: any) {
    for (const u of this.uniqueColumns) {
      if (entity && entity[u]) {
        const found = await this.findOneBy({ [u]: entity[u] } as any);

        if (found && found['id'] === entity.id) {
          return;
        }
        if (found) {
          const error = new ValidationError();
          error.constraints = { unique: `${u.toString()} must be unique!` };
          error.property = u as string;
          throw new UnprocessableEntityException([error]);
        }
      }
    }
  }
}
