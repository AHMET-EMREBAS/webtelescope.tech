import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiConstants, getApiPaths } from '@webpackages/util';
import { Sample as EntityClass } from '../entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { QuerySampleDto as QueryDto } from '../dto/query';
import {
  CreateSampleDto as CreateDto,
  UpdateSampleDto as UpdateDto,
} from '../dto';
import { RelationDto, UnsetRelationDto } from '@webpackages/core';

const API_PATHS = getApiPaths(EntityClass.name);

@ApiBearerAuth(ApiConstants.AUTH_TOKEN)
@ApiTags('SampleController')
@Controller()
export class SampleController {
  constructor(
    @InjectRepository(EntityClass)
    private readonly repo: Repository<EntityClass>
  ) {}

  async checkUnique(entity: Partial<EntityClass>) {
    const uniqueFields: (keyof EntityClass)[] = ['name'];

    for (const field of uniqueFields) {
      const found = await this.repo.findOneBy({
        [field]: ILike(entity[field]),
      });

      if (found) {
        throw new UnprocessableEntityException(`${field} should be unique!`);
      }
    }
  }

  @Get(API_PATHS.PLURAL_PATH)
  findAll(@Query() query: QueryDto) {
    const { skip, take, orderBy, orderDir, search, withDeleted } = query;

    console.log(query);
    
    const queryBuilder = this.repo.createQueryBuilder();

    queryBuilder
      .take(take)
      .skip(skip)
      .orderBy(orderBy || 'id', orderDir || 'ASC');

    if (withDeleted) queryBuilder.withDeleted();

    if (search) queryBuilder.where({ name: ILike(`%${search}%`) });

    return queryBuilder.execute();
  }

  @Get(API_PATHS.BY_ID_PATH)
  findOneById(@Param(API_PATHS.ID_KEY, ParseIntPipe) id: number) {
    return this.repo.findOneBy({ id });
  }

  @Post(API_PATHS.SINGULAR_PATH)
  async save(@Body() entity: CreateDto) {
    await this.checkUnique(entity);
    return await this.repo.save(entity);
  }

  @Put(API_PATHS.BY_ID_PATH)
  async update(
    @Param(API_PATHS.ID_KEY, ParseIntPipe) id: number,
    @Body() updateDto: UpdateDto
  ) {
    await this.checkUnique(updateDto);
    return await this.repo.update(id, updateDto);
  }

  @Delete(API_PATHS.BY_ID_PATH)
  delete(@Param(API_PATHS.ID_KEY, ParseIntPipe) id: number) {
    return this.repo.delete(id);
  }

  @Put(API_PATHS.RELATION_NAME_AND_ID_PATH)
  add(@Param() relationDto: RelationDto) {
    const { id, relationId, relationName } = relationDto;
    return this.repo
      .createQueryBuilder()
      .relation(relationName)
      .of(id)
      .add(relationId);
  }

  @Delete(API_PATHS.RELATION_NAME_AND_ID_PATH)
  remove(@Param() relationDto: RelationDto) {
    const { id, relationId, relationName } = relationDto;
    return this.repo
      .createQueryBuilder()
      .relation(relationName)
      .of(id)
      .remove(relationId);
  }

  @Post(API_PATHS.RELATION_NAME_AND_ID_PATH)
  set(@Param() relationDto: RelationDto) {
    const { id, relationId, relationName } = relationDto;
    return this.repo
      .createQueryBuilder()
      .relation(relationName)
      .of(id)
      .set(relationId);
  }

  @Post(API_PATHS.RELATION_ID_KEY)
  unset(@Param() relationDto: UnsetRelationDto) {
    const { id, relationName } = relationDto;

    return this.repo
      .createQueryBuilder()
      .relation(relationName)
      .of(id)
      .set(null);
  }
}
