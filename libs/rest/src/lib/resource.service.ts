/* eslint-disable @typescript-eslint/no-explicit-any */
import { FindOptionsOrder, FindOptionsWhere, ILike, Repository } from 'typeorm';

import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { QueryDto } from './query.dto';
import { BaseEntity } from './base.entity';

export class ResourceService<
  T extends Partial<BaseEntity>,
  K extends string & keyof T = string & keyof T
> {
  constructor(
    protected readonly repo: Repository<Partial<T>>,
    protected readonly textFields: K[],
    protected readonly uniqueFields: K[]
  ) {}

  private async isUnique(entity: Partial<T>) {
    for (const u of this.uniqueFields) {
      const found = await this.repo.findOneBy({
        [u]: ILike(entity[u]),
      } as FindOptionsWhere<T>);

      if (found) {
        throw new UnprocessableEntityException(`${u} must be unique!`);
      }
    }
  }

  private async findOneByIdOrThrow(id: number) {
    const found = await this.repo.findOneBy({ id } as any);
    if (found) return found;
    throw new NotFoundException(`Entity not found by ${id}`);
  }

  async save(entity: Partial<T>) {
    await this.isUnique(entity);
    return await this.repo.save(entity);
  }

  async find(query: QueryDto) {
    const { orderBy, orderDir, search, skip, take, withDeleted } = query;

    let where: FindOptionsWhere<T> = {};
    let order: FindOptionsOrder<T> = {};

    if (orderBy && orderBy)
      order = { [orderBy]: orderDir } as FindOptionsOrder<T>;

    if (search)
      where = this.textFields
        .map((e) => ({ [e]: ILike(`%${search}%`) }))
        .reduce((p, c) => ({ ...p, ...c })) as FindOptionsWhere<T>;

    return this.repo.find({ take, skip, withDeleted, order, where });
  }

  async findOneById(id: number) {
    return this.findOneByIdOrThrow(id);
  }

  async update(id: number, entity: Partial<T>) {
    await this.findOneByIdOrThrow(id);
    return await this.repo.update(id, entity as any);
  }

  async delete(id: number) {
    await this.findOneByIdOrThrow(id);
    return await this.repo.delete(id);
  }

  async add(id: number, relationName: string, relationId: number) {
    await this.findOneByIdOrThrow(id);
    return await this.repo
      .createQueryBuilder()
      .relation(relationName)
      .of(id)
      .add(relationId);
  }

  async remove(id: number, relationName: string, relationId: number) {
    await this.findOneByIdOrThrow(id);
    return await this.repo
      .createQueryBuilder()
      .relation(relationName)
      .of(id)
      .remove(relationId);
  }

  async set(id: number, relationName: string, relationId: number) {
    await this.findOneByIdOrThrow(id);
    return await this.repo
      .createQueryBuilder()
      .relation(relationName)
      .of(id)
      .set(relationId);
  }

  async unset(id: number, relationName: string) {
    await this.findOneByIdOrThrow(id);
    return await this.repo
      .createQueryBuilder()
      .relation(relationName)
      .of(id)
      .set(null);
  }
}
