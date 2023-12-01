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
} from '@nestjs/common';
import { ApiOperation, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ILike, Repository } from 'typeorm';
import { PriceLevel } from './entities';
import { CreatePriceLevelDto, UpdatePriceLevelDto } from './dtos';
import { InjectRepository } from '@nestjs/typeorm';

import {
  QueryDto,
  RELATION_AND_ID_PATH,
  RELATION_PATH,
  RelationAndIdDto,
  RelationDto,
  TransformAndValidatePipe,
  UserId,
} from '@webpackages/core';
import {
  AUTH_BEARER_NAME,
  DeletePermission,
  ReadPermission,
  UpdatePermission,
  WritePermission,
} from '@webpackages/auth';

@ApiBearerAuth(AUTH_BEARER_NAME)
@ApiTags('PriceLevelController')
@Controller()
export class PriceLevelController {
  constructor(
    @InjectRepository(PriceLevel) private readonly repo: Repository<PriceLevel>
  ) {}

  @ApiOperation({
    summary:
      'Find all PriceLevel by query (paginator, order, search, and select)',
  })
  @ReadPermission('price-level')
  @Get('price-levels')
  find(@Query(TransformAndValidatePipe) query: QueryDto) {
    const { orderBy, orderDir, search, skip, take, withDeleted, select } =
      query;
    return this.repo.find({
      take,
      skip,
      order: {
        [orderBy]: orderDir,
      },
      withDeleted,
      where: {
        name: ILike(`%${search}%`),
      },
      select,
    });
  }

  @ApiOperation({ summary: 'Find PriceLevel by id' })
  @ReadPermission('price-level')
  @Get('price-level/:id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.repo.findOneBy({ id });
  }

  @ApiOperation({ summary: 'Save PriceLevel' })
  @WritePermission('price-level')
  @Post('price-level')
  async save(
    @Body(TransformAndValidatePipe) body: CreatePriceLevelDto,
    @UserId() userId: number
  ) {
    return await this.repo.save({
      ...body,
      createdBy: userId,
      updatedBy: userId,
    });
  }

  @ApiOperation({ summary: 'Update PriceLevel' })
  @UpdatePermission('price-level')
  @Put('price-level/:id')
  udpate(
    @Param('id', ParseIntPipe) id: number,
    @Body(TransformAndValidatePipe) body: UpdatePriceLevelDto,
    @UserId() userId: number
  ) {
    return this.repo.update(id, { ...body, updatedBy: userId });
  }

  @ApiOperation({ summary: 'Delete PriceLevel by id' })
  @DeletePermission('price-level')
  @Delete('price-level/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.repo.delete(id);
  }

  @ApiOperation({ summary: 'Update PriceLevel by id' })
  @UpdatePermission('price-level')
  @Put(`price-level/${RELATION_AND_ID_PATH}`)
  async add(
    @Param(TransformAndValidatePipe) relation: RelationAndIdDto,
    @UserId() userId: number
  ) {
    const { id, relationId, relationName } = relation;
    await this.repo.update(id, { updatedBy: userId });
    return await this.repo
      .createQueryBuilder()
      .relation(relationName)
      .of(id)
      .add(relationId);
  }

  @ApiOperation({
    summary: 'Remove PriceLevel relation by id, relationName, and relationId',
  })
  @UpdatePermission('price-level')
  @Delete(`price-level/${RELATION_AND_ID_PATH}`)
  async remove(
    @Param(TransformAndValidatePipe) relation: RelationAndIdDto,
    @UserId() userId: number
  ) {
    const { id, relationId, relationName } = relation;
    await this.repo.update(id, { updatedBy: userId });
    return await this.repo
      .createQueryBuilder()
      .relation(relationName)
      .of(id)
      .add(relationId);
  }

  @ApiOperation({ summary: 'Set PriceLevel relation by id' })
  @UpdatePermission('price-level')
  @Post(`price-level/${RELATION_AND_ID_PATH}`)
  async set(
    @Param(TransformAndValidatePipe) relation: RelationAndIdDto,
    @UserId() userId: number
  ) {
    const { id, relationId, relationName } = relation;
    await this.repo.update(id, { updatedBy: userId });
    return await this.repo
      .createQueryBuilder()
      .relation(relationName)
      .of(id)
      .set(relationId);
  }

  @ApiOperation({ summary: 'Unset PriceLevel relation by id' })
  @UpdatePermission('price-level')
  @Delete(`price-level/${RELATION_PATH}`)
  async unset(
    @Param(TransformAndValidatePipe) relation: RelationDto,
    @UserId() userId: number
  ) {
    const { id, relationName } = relation;
    await this.repo.update(id, { updatedBy: userId });
    return await this.repo
      .createQueryBuilder()
      .relation(relationName)
      .of(id)
      .set(null);
  }
}