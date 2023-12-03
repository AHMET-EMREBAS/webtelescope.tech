/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { BaseService, RepoMetadata, serviceToken } from '../services';
import {
  BaseIDEntity,
  QueryDto,
  RelationByIdDto,
  RelationDto,
} from '../entities';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { ClassConstructor } from 'class-transformer';
import { ValidateDtoPipe } from './validation-pipe';
import { API_BEARER_NAME } from '../constants';
import { SecurityBuilder } from '../auth';

export type ControllerOptions = {
  singularPath: string;
  pluralPath: string;
  entity: ClassConstructor<unknown>;
  createDto: ClassConstructor<unknown>;
  updateDto: ClassConstructor<unknown>;
};

export function BuildController<T extends BaseIDEntity = BaseIDEntity>(
  options: ControllerOptions
): ClassConstructor<unknown> {
  const { singularPath, pluralPath, entity, createDto, updateDto } = options;

  const entityName = entity.name;

  const AUTH = new SecurityBuilder(entity);

  @ApiBearerAuth(API_BEARER_NAME)
  @ApiTags(`${entity.name}Controller`)
  @Controller()
  class __Controller {
    constructor(
      @Inject(serviceToken(entity)) public readonly service: BaseService<T>
    ) {}

    @ApiOkResponse({ description: `Success`, type: RepoMetadata })
    @ApiOperation({ summary: `${entityName} metadata` })
    @Get(`${singularPath}-meta`)
    @AUTH.READ()
    meta(): Promise<RepoMetadata<T>> {
      return this.service.meta();
    }

    @ApiOkResponse({ description: 'Success', type: entity, isArray: true })
    @ApiOperation({ summary: `Find ${entityName}` })
    @Get(pluralPath)
    @AUTH.READ()
    findAll(@Query(ValidateDtoPipe) query: QueryDto) {
      return this.service.findAll(query);
    }

    @ApiOkResponse({ description: 'Success', type: entity })
    @ApiNotFoundResponse({ description: 'Not found' })
    @ApiOperation({ summary: `Find ${entityName} by id` })
    @Get(`${singularPath}/:id`)
    @AUTH.READ()
    findOneById(@Param('id', ParseIntPipe) id: number) {
      return this.service.findOneById(id);
    }

    @ApiCreatedResponse({ description: 'Success', type: entity })
    @ApiUnprocessableEntityResponse({ description: 'Validation Error' })
    @ApiOperation({ summary: `Save ${entityName}` })
    @Post(singularPath)
    @ApiBody({ type: createDto })
    @AUTH.WRITE()
    save(@Body(ValidateDtoPipe) body: T) {
      return this.service.save(body);
    }

    @ApiOkResponse({ description: 'Success', type: entity })
    @ApiUnprocessableEntityResponse({ description: 'Validation Error' })
    @ApiNotFoundResponse({ description: 'Not found' })
    @ApiOperation({ summary: `Update ${entityName}` })
    @Put(`${singularPath}/:id`)
    @ApiBody({ type: updateDto })
    @AUTH.UPDATE()
    async update(
      @Param('id', ParseIntPipe) id: number,
      @Body(ValidateDtoPipe) body: QueryDeepPartialEntity<T>
    ) {
      await this.service.update(id, body);
      return await this.service.findOneById(id);
    }

    @ApiOkResponse({ description: 'Success', type: entity })
    @ApiNotFoundResponse({ description: 'Not found' })
    @ApiOperation({ summary: `Add relation to ${entityName}` })
    @Put(`${singularPath}/:id/:relationName/:relationId`)
    @AUTH.UPDATE()
    async add(@Param(ValidateDtoPipe) relation: RelationByIdDto) {
      return await this.service.add(relation);
    }

    @ApiOkResponse({ description: 'Success' })
    @ApiNotFoundResponse({ description: 'Not found' })
    @ApiOperation({ summary: `Remove relation from ${entityName}` })
    @Delete(`${singularPath}/:id/:relationName/:relationId`)
    @AUTH.UPDATE()
    remove(@Param(ValidateDtoPipe) relation: RelationByIdDto) {
      return this.service.remove(relation);
    }

    @ApiOkResponse({ description: 'Success', type: entity })
    @ApiNotFoundResponse({ description: 'Not found' })
    @ApiOperation({ summary: `Set relation to ${entityName}` })
    @Delete(`${singularPath}/:id/:relationName/:relationId`)
    @AUTH.UPDATE()
    set(@Param(ValidateDtoPipe) relation: RelationByIdDto) {
      return this.service.set(relation);
    }

    @ApiOkResponse({ description: 'Success' })
    @ApiNotFoundResponse({ description: 'Not found' })
    @ApiOperation({ summary: `Unset relation from ${entityName}` })
    @Delete(`${singularPath}/:id/:relationName`)
    @AUTH.UPDATE()
    unset(@Param(ValidateDtoPipe) relation: RelationDto) {
      return this.service.unset(relation);
    }
  }

  return __Controller;
}
