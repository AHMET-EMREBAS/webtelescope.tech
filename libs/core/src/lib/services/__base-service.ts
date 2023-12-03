/* eslint-disable @typescript-eslint/no-explicit-any */
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import {
  BaseIDEntity,
  QueryDto,
  RelationByIdDto,
  RelationDto,
} from '../entities';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import {
  Inject,
  NotFoundException,
  Provider,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassConstructor, Exclude } from 'class-transformer';
import { PositiveIntegerProperty, TextProperty } from '../properties';

export type UniqueError<T> = {
  property: keyof T;
  constraints: { unique: string };
};

@Exclude()
export class RepoMetadata<T> {
  @PositiveIntegerProperty() count!: number;
  @TextProperty({ isArray: true }) unqiueFields!: (keyof T)[];
}

export class BaseService<Entity extends BaseIDEntity> {
  private readonly fields = this.repo.metadata.columns.map(
    (e) => e.propertyName
  );

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

  protected parepareWhere(search: string) {
    return this.fields.map((e) => ({ [e]: ILike(`%${search}%`) }));
  }

  async meta(): Promise<RepoMetadata<Entity>> {
    return {
      count: await this.repo.count(),
      unqiueFields: this.unqiueFields,
    };
  }

  async findAll(query: QueryDto) {
    const { orderBy, orderDir, search, skip, take, withDeleted } = query;
    return await this.repo.find({
      take,
      skip,
      withDeleted,
      where: this.parepareWhere(search || '') as any,
      order: { [orderBy || 'id']: orderDir || 'asc' } as any,
    });
  }

  async findOneById(id: number) {
    return await this.repo.findOneBy({ id } as any);
  }

  async findOneBy(key: keyof Entity, value: any) {
    return await this.repo.findOneBy({ [key]: value } as any);
  }

  async save(entity: Entity, userId: number) {
    await this.throwIfNotUnqiue(entity);
    return await this.repo.save({
      ...entity,
      createdBy: userId,
      updatedBy: userId,
    });
  }

  async update(
    id: number,
    entity: QueryDeepPartialEntity<Entity>,
    userId: number
  ) {
    const found = await this.findOneByIdOrThrow(id);

    const __isUnique = await this.isUnique(entity);

    if (__isUnique === true) {
      await this.repo.update(id, entity);
      return found;
    } else {
      if (
        found[__isUnique.property] == (entity as Entity)[__isUnique.property]
      ) {
        return await this.repo.update(id, {
          ...entity,
          updatedBy: userId,
        });
      } else {
        this.throwUniqueException(__isUnique);
        return;
      }
    }
  }

  async delete(id: number) {
    const found = await this.findOneByIdOrThrow(id);
    await this.repo.delete(id);
    return found;
  }

  /**
   * Adds ManyToMany relation entity
   * @param relation
   * @returns
   */
  async add(relation: RelationByIdDto) {
    const { id, relationId, relationName } = relation;
    const found = await this.findOneByIdOrThrow(id);
    await this.repo
      .createQueryBuilder()
      .relation(relationName)
      .of(id)
      .add(relationId);
    return found;
  }

  /**
   * Removes ManyToMany relation entity
   * @param relation
   * @returns
   */
  async remove(relation: RelationByIdDto) {
    const { id, relationId, relationName } = relation;
    const found = await this.findOneByIdOrThrow(id);
    await this.repo
      .createQueryBuilder()
      .relation(relationName)
      .of(id)
      .remove(relationId);

    return found;
  }

  /**
   * Set ManyToOne or OneToOne relation entity
   */
  async set(relation: RelationByIdDto) {
    const { id, relationId, relationName } = relation;
    const found = await this.findOneByIdOrThrow(id);
    await this.repo
      .createQueryBuilder()
      .relation(relationName)
      .of(id)
      .set(relationId);

    return found;
  }

  /**
   * Unset ManyToOne or OneToOne relation entityF
   * @param relation
   * @returns
   */
  async unset(relation: RelationDto) {
    const { id, relationName } = relation;
    const found = await this.findOneByIdOrThrow(id);
    await this.repo
      .createQueryBuilder()
      .relation(relationName)
      .of(id)
      .set(null);
    return found;
  }
}

export function BuildService<T extends BaseIDEntity>(
  entity: ClassConstructor<unknown>
): ClassConstructor<BaseService<T>> {
  class __Service extends BaseService<T> {
    constructor(@InjectRepository(entity) repo: Repository<T>) {
      super(repo);
    }
  }
  return __Service;
}

export function serviceToken(entity: ClassConstructor<unknown>) {
  return `${entity.name}Servcie`;
}

export function provideService(entity: ClassConstructor<unknown>): Provider {
  return {
    provide: serviceToken(entity),
    useClass: BuildService(entity),
  };
}

export function InjectService(entity: ClassConstructor<unknown>) {
  return Inject(serviceToken(entity));
}
