/* eslint-disable @typescript-eslint/no-explicit-any */
import { Type, UnprocessableEntityException } from '@nestjs/common';
import { IController } from './controller';
import {
  QueryDto,
  AddRelationDto,
  RemoveRelationDto,
  SetRelationDto,
  UnsetRelationDto,
  Query,
  Param,
  Body,
  UpdateResult,
  DeleteResult,
} from '@webpackages/dto';
import { ObjectIDDto } from '@webpackages/property';
import { ApiBody } from '@nestjs/swagger';
import { RestResource } from './rest';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

export type CreateControllerOptions = {
  entity: Type;
  createDto: Type;
  updateDto: Type;
};

export function CreateController<
  E extends Type,
  C extends Type,
  U extends Type
>(options: CreateControllerOptions): Type<IController<E, C, U>> {
  const R = new RestResource(options.entity);

  @R.Controller()
  class Controller implements IController<E, C, U> {
    constructor(
      @InjectRepository(options.entity) public readonly repo: Repository<E>
    ) {}

    async isUniqueOrThrow(entity: C | U) {
      const uniqueProperties = this.repo.metadata.uniques.map(
        (e) => e.columns[0].propertyName
      );

      for (const u of uniqueProperties) {
        if ((entity as any)[u]) {
          const found = await this.repo.findOneBy({
            [u]: ILike((entity as any)[u]),
          } as any);
          if (found) {
            throw new UnprocessableEntityException([
              { property: u, constraints: { isUnique: `${u} must be unique` } },
            ]);
          }
        }
      }
    }

    @R.FindAll()
    async findAll(@Query() query: QueryDto<E>): Promise<E[]> {
      console.log(query);
      return await this.repo.find({ ...(query as any) });
    }

    @R.FindOneById()
    findOneById(@Param() query: ObjectIDDto): Promise<E> {
      return this.repo.findOneByOrFail(query as any);
    }

    @R.Save()
    @ApiBody({ type: options.createDto })
    async save(@Body(options.createDto) entity: C): Promise<E> {
      await this.isUniqueOrThrow(entity);
      const { id } = await this.repo.save(entity as any);
      return await this.findOneById({ id });
    }

    @R.Update()
    @ApiBody({ type: options.updateDto })
    async update(query: ObjectIDDto, entity: U): Promise<UpdateResult> {
      await this.isUniqueOrThrow(entity);
      await this.findOneById(query);
      return await this.repo.update(query.id, entity as any);
    }

    @R.Delete()
    async delete(@Param() query: ObjectIDDto): Promise<DeleteResult> {
      await this.findOneById(query);
      return await this.repo.delete(query.id);
    }

    @R.AddRelation()
    async addRelation(@Param() relation: AddRelationDto): Promise<E> {
      await this.repo
        .createQueryBuilder()
        .relation(relation.relationName)
        .of(relation.id)
        .add(relation.relationId);

      return await this.findOneById(relation);
    }

    @R.RemoveRelation()
    async removeRelation(@Param() relation: RemoveRelationDto): Promise<E> {
      await this.repo
        .createQueryBuilder()
        .relation(relation.relationName)
        .of(relation.id)
        .remove(relation.relationId);

      return await this.findOneById(relation);
    }

    @R.SetRelation()
    async setRelation(@Param() relation: SetRelationDto): Promise<E> {
      await this.repo
        .createQueryBuilder()
        .relation(relation.relationName)
        .of(relation.id)
        .set(relation.relationId);
      return await this.findOneById(relation);
    }

    @R.UnsetRelation()
    async unsetRelation(@Param() relation: UnsetRelationDto): Promise<E> {
      await this.repo
        .createQueryBuilder()
        .relation(relation.relationName)
        .of(relation.id)
        .set(null);
      return await this.findOneById(relation);
    }

    @R.Count()
    async count(): Promise<number> {
      return await this.repo.count();
    }
  }

  return Controller;
}
