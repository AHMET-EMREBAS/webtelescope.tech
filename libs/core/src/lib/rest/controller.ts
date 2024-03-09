/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Body,
  Controller,
  NotFoundException,
  NotImplementedException,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClassConstructor } from 'class-transformer';
import { HttpMethod } from './method';
import { ResourceMetadata } from './resource-metadata';
import { Entity, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IdParam } from './params';
import {
  AddRelationDto,
  IDDto,
  QueryDto,
  RemoveRelationDto,
  SetRelationDto,
  UnsetRelationDto,
  toFindManyOptions,
} from '../dtos';

const ValidateAndTransformPipe = new ValidationPipe({ transform: true });

export function getResourceController(
  options: ResourceMetadata
): ClassConstructor<unknown> {
  const HTTP = new HttpMethod(options);

  @Controller()
  @ApiTags(options.entity.name + 'Controller')
  class ResourceController {
    constructor(
      @InjectRepository(options.entity) protected readonly repo: Repository<any>
    ) {}

    @HTTP.FindAll()
    findAll(@Query(ValidateAndTransformPipe) query: QueryDto) {
      const options = toFindManyOptions(query);
      return this.repo.find(options);
    }

    @HTTP.FindOneByID()
    findOneById(@IdParam() id: number) {
      try {
        return this.repo.findOneByOrFail({ id });
      } catch (err) {
        throw new NotFoundException();
      }
    }

    @HTTP.SaveOne()
    saveOne(@Body(ValidateAndTransformPipe) entity: any) {
      return this.repo.save(entity);
    }

    @HTTP.SaveMany()
    saveMany(@Body(ValidateAndTransformPipe) entities: any) {
      return this.repo.save(entities);
    }

    @HTTP.UpdateOne()
    updateOne(
      @IdParam() id: number,
      @Body(ValidateAndTransformPipe) entity: any
    ) {
      return this.repo.update(id, entity);
    }

    @HTTP.UpdateMany()
    upateMany(@Body(ValidateAndTransformPipe) entities: any[]) {
      throw new NotImplementedException();
    }

    @HTTP.DeleteOne()
    deleteOne(@IdParam() id: number) {
      return this.repo.delete(id);
    }

    @HTTP.DeleteMany()
    deleteMany(@Body() ids: IDDto[]) {
      return this.repo.delete(ids);
    }

    @HTTP.Count()
    count() {
      return this.repo.count();
    }

    @HTTP.AddRelation()
    async addRelation(
      @Query(ValidateAndTransformPipe) relation: AddRelationDto
    ) {
      return await this.repo
        .createQueryBuilder()
        .relation(relation.relationName)
        .of(relation.id)
        .add(relation.id);
    }

    @HTTP.RemoveRelation()
    async removeRelation(
      @Query(ValidateAndTransformPipe) relation: RemoveRelationDto
    ) {
      return await this.repo
        .createQueryBuilder()
        .relation(relation.relationName)
        .of(relation.id)
        .remove(relation.id);
    }

    @HTTP.SetRelation()
    async setRelation(
      @Query(ValidateAndTransformPipe) relation: SetRelationDto
    ) {
      return await this.repo
        .createQueryBuilder()
        .relation(relation.relationName)
        .of(relation.id)
        .set(relation.id);
    }

    @HTTP.UnsetRelation()
    async unsetRelation(
      @Query(ValidateAndTransformPipe) relation: UnsetRelationDto
    ) {
      return await this.repo
        .createQueryBuilder()
        .relation(relation.relationName)
        .of(relation.id)
        .set(null);
    }
  }

  return ResourceController;
}
