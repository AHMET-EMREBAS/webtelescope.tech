/* eslint-disable @typescript-eslint/no-explicit-any */
import { UnprocessableEntityException } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { DeepPartial, ObjectLiteral, Repository } from 'typeorm';

export class RepositoryService<T extends ObjectLiteral> extends Repository<T> {
  protected readonly uniqueColumns: (keyof T)[] =
    this.repository.metadata.ownUniques
      .map((e) => e.givenColumnNames)
      .flat() as (keyof T)[];

  constructor(protected readonly repository: Repository<T>) {
    super(repository.target, repository.manager, repository.queryRunner);
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

  async valideUnique(entity: any) {
    for (const u of this.uniqueColumns) {
      if (entity && entity[u]) {
        const found = await this.findOneBy({ [u]: entity[u] } as any);
        if (found) {
          const error = new ValidationError();
          error.constraints = { unique: `${u.toString()} must be unique!` };
          throw new UnprocessableEntityException(error);
        }
      }
    }
  }
}
