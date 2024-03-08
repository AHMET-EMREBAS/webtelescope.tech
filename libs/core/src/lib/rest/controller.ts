/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Body,
  Controller,
  NotFoundException,
  NotImplementedException,
  Query,
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
} from '../dtos';

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
    findAll(@Query() query: QueryDto) {
      return this.repo.find(query);
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
    saveOne(@Body() entity: any) {
      return this.repo.save(entity);
    }

    @HTTP.SaveMany()
    saveMany(@Body() entities: any) {
      return this.repo.save(entities);
    }

    @HTTP.UpdateOne()
    updateOne(@IdParam() id: number, @Body() entity: any) {
      return this.repo.update(id, entity);
    }

    @HTTP.UpdateMany()
    upateMany(@Body() entities: any[]) {
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
    async addRelation(@Query() relation: AddRelationDto) {
      return await this.repo
        .createQueryBuilder()
        .relation(relation.relationName)
        .of(relation.id)
        .add(relation.id);
    }

    @HTTP.RemoveRelation()
    async removeRelation(@Query() relation: RemoveRelationDto) {
      return await this.repo
        .createQueryBuilder()
        .relation(relation.relationName)
        .of(relation.id)
        .remove(relation.id);
    }

    @HTTP.SetRelation()
    async setRelation(@Query() relation: SetRelationDto) {
      return await this.repo
        .createQueryBuilder()
        .relation(relation.relationName)
        .of(relation.id)
        .set(relation.id);
    }

    @HTTP.UnsetRelation()
    async unsetRelation(@Query() relation: UnsetRelationDto) {
      return await this.repo
        .createQueryBuilder()
        .relation(relation.relationName)
        .of(relation.id)
        .set(null);
    }
  }

  return ResourceController;
}
