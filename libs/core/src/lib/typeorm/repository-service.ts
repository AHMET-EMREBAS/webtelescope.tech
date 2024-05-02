/* eslint-disable @typescript-eslint/no-explicit-any */
import { UnprocessableEntityException } from '@nestjs/common';
import { IID } from '@webpackages/common';
import { ValidationError } from 'class-validator';
import { DeepPartial, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class RepositoryService<T extends IID> extends Repository<T> {
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

  async updateSafe(id: number, entity: QueryDeepPartialEntity<T>) {
    await this.valideUnique({ id, ...entity });
    return super.update(id, entity);
  }

  // {
  //   "message": [
  //     {
  //       "property": "name",
  //       "constraints": {
  //         "unique": "name must be shorter than or equal to 100 characters"
  //       }
  //     }
  //   ],
  //   "error": "Unprocessable Entity",
  //   "statusCode": 422
  // }
  async valideUnique(entity: any) {
    for (const u of this.uniqueColumns) {
      if (entity && entity[u]) {
        const found = await this.findOneBy({ [u]: entity[u] } as any);

        if (found && found.id === entity.id) {
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
