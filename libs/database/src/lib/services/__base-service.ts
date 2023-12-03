/* eslint-disable @typescript-eslint/no-explicit-any */
import { FindOptionsWhere, Repository } from 'typeorm';
import { BaseIDEntity, RelationByIdDto, RelationDto } from '../entities';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

export type UniqueError<T> = {
  property: keyof T;
  constraints: { unique: string };
};

export class BaseService<Entity extends BaseIDEntity> {
  private readonly unqiueFields = this.repo.metadata.uniques.map(
    (e) => e.columns.pop()?.propertyName
  ) as (keyof Entity)[];

  constructor(private readonly repo: Repository<Entity>) {}

  /**
   * If entity is unique, then return true, else return error message
   * @param entity
   * @returns
   */
  protected async isUnique(entity: any): Promise<UniqueError<Entity> | true> {
    if (this.unqiueFields) {
      for (const u of this.unqiueFields) {
        const found = await this.repo.findOneBy({
          [u]: (entity as any)[u],
        } as FindOptionsWhere<Entity>);

        if (found) {
          return {
            property: u.toString() as keyof Entity,
            constraints: {
              unique: `${u.toString()} property must be unique!`,
            },
          };
        }
      }
      return true;
    }

    return true;
  }

  protected throwUniqueException(uniqueError: UniqueError<Entity>) {
    throw new UnprocessableEntityException([uniqueError]);
  }

  protected async throwIfNotUnqiue(entity: Entity) {
    const __isUnique = await this.isUnique(entity);
    if (__isUnique === true) {
      return;
    } else {
      this.throwUniqueException(__isUnique);
    }
  }

  protected async findOneByIdOrThrow(id: number) {
    const found = await this.repo.findOneBy({ id } as any);
    if (!found) throw new NotFoundException(`Entity not found!`);

    return found;
  }

  async save(entity: Entity) {
    await this.throwIfNotUnqiue(entity);
    return await this.repo.save(entity);
  }

  async update(id: number, entity: QueryDeepPartialEntity<Entity>) {
    const found = await this.findOneByIdOrThrow(id);

    const __isUnique = await this.isUnique(entity);

    if (__isUnique === true) {
      return await this.repo.update(id, entity);
    } else {
      if (
        found[__isUnique.property] == (entity as Entity)[__isUnique.property]
      ) {
        return await this.repo.update(id, entity);
      } else {
        this.throwUniqueException(__isUnique);
        return;
      }
    }
  }

  async delete(id: number) {
    await this.findOneByIdOrThrow(id);
    return await this.repo.delete(id);
  }

  /**
   * Adds ManyToMany relation entity
   * @param relation
   * @returns
   */
  async add(relation: RelationByIdDto) {
    const { id, relationId, relationName } = relation;
    await this.findOneByIdOrThrow(id);
    return await this.repo
      .createQueryBuilder()
      .relation(relationName)
      .of(id)
      .add(relationId);
  }

  /**
   * Removes ManyToMany relation entity
   * @param relation
   * @returns
   */
  async remove(relation: RelationByIdDto) {
    const { id, relationId, relationName } = relation;
    await this.findOneByIdOrThrow(id);
    return await this.repo
      .createQueryBuilder()
      .relation(relationName)
      .of(id)
      .remove(relationId);
  }

  /**
   * Set ManyToOne or OneToOne relation entity
   */
  async set(relation: RelationByIdDto) {
    const { id, relationId, relationName } = relation;
    await this.findOneByIdOrThrow(id);
    return await this.repo
      .createQueryBuilder()
      .relation(relationName)
      .of(id)
      .set(relationId);
  }

  /**
   * Unset ManyToOne or OneToOne relation entityF
   * @param relation
   * @returns
   */
  async unset(relation: RelationDto) {
    const { id, relationName } = relation;
    await this.findOneByIdOrThrow(id);
    return await this.repo
      .createQueryBuilder()
      .relation(relationName)
      .of(id)
      .set(null);
  }
}
