/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CanActivate,
  InternalServerErrorException,
  NotFoundException,
  Type,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
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
  log?: boolean;
  guards?: Type<CanActivate>[];
  searchables?: string[];
};

export function CreateController<
  E extends Type,
  C extends Type,
  U extends Type
>(options: CreateControllerOptions): Type<IController<E, C, U>> {
  const R = new RestResource(options.entity, options.guards);

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
    async findAll(@Query() query: QueryDto): Promise<E[]> {
      try {
        return await this.repo.find({ ...(query as any) });
      } catch (err) {
        console.error(err);
        throw new UnauthorizedException('Invalid query');
      }
    }

    @R.FindOneById()
    findOneById(@Param() query: ObjectIDDto): Promise<E> {
      try {
        return this.repo.findOneByOrFail(query as any);
      } catch (err) {
        console.error(err);
        throw new NotFoundException(`Entity not found by id ${query.id}.`);
      }
    }

    @R.Save()
    @ApiBody({ type: options.createDto })
    async save(@Body(options.createDto) entity: C): Promise<E> {
      await this.isUniqueOrThrow(entity);
      try {
        const { id } = await this.repo.save(entity as any);
        return await this.findOneById({ id });
      } catch (err) {
        console.error(err);
        throw new InternalServerErrorException('Something went wrong!');
      }
    }

    @R.Update()
    @ApiBody({ type: options.updateDto })
    async update(
      @Param() query: ObjectIDDto,
      @Body(options.updateDto) entity: U
    ): Promise<UpdateResult> {
      await this.isUniqueOrThrow(entity);

      try {
        await this.findOneById(query);
        return await this.repo.update(query.id, entity as any);
      } catch (err) {
        console.error(err);
        throw new InternalServerErrorException('Something went wrong!');
      }
    }

    @R.Delete()
    async delete(@Param() query: ObjectIDDto): Promise<DeleteResult> {
      await this.findOneById(query);
      try {
        return await this.repo.delete(query.id);
      } catch (err) {
        console.error(err);
        throw new InternalServerErrorException('Something went wrong!');
      }
    }

    @R.AddRelation()
    async addRelation(@Param() relation: AddRelationDto): Promise<E> {
      const { id, relationId, relationName } = relation;

      try {
        await this.repo
          .createQueryBuilder()
          .relation(relationName)
          .of(id)
          .add(relationId);

        return await this.findOneById({ id: relation.id });
      } catch (err) {
        console.error(err);
        throw new InternalServerErrorException('Something went wrong!');
      }
    }

    @R.RemoveRelation()
    async removeRelation(@Param() relation: RemoveRelationDto): Promise<E> {
      const { id, relationId, relationName } = relation;

      try {
        await this.repo
          .createQueryBuilder()
          .relation(relationName)
          .of(id)
          .remove(relationId);

        return await this.findOneById({ id });
      } catch (err) {
        console.error(err);
        throw new InternalServerErrorException('Something went wrong!');
      }
    }

    @R.SetRelation()
    async setRelation(@Param() relation: SetRelationDto): Promise<E> {
      const { id, relationId, relationName } = relation;

      try {
        await this.repo
          .createQueryBuilder()
          .relation(relationName)
          .of(id)
          .set(relationId);
        return await this.findOneById({ id });
      } catch (err) {
        throw new InternalServerErrorException('Something went wrong!');
      }
    }

    @R.UnsetRelation()
    async unsetRelation(@Param() relation: UnsetRelationDto): Promise<E> {
      const { id, relationName } = relation;
      try {
        await this.repo
          .createQueryBuilder()
          .relation(relationName)
          .of(id)
          .set(null);
        return await this.findOneById(relation);
      } catch (err) {
        console.error(err);
        throw new InternalServerErrorException('Something went wrong!');
      }
    }

    @R.Count()
    async count(): Promise<number> {
      try {
        return await this.repo.count();
      } catch (err) {
        console.error(err);
        throw new InternalServerErrorException('Something went wrong!');
      }
    }
  }

  return Controller;
}
