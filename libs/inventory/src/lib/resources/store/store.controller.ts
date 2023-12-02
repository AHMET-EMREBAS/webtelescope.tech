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
import { ApiOperation, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ILike, Repository } from 'typeorm';
import { Store } from './entities';
import { CreateStoreDto, UpdateStoreDto } from './dtos';
import { InjectRepository } from '@nestjs/typeorm';

import {
  QueryDto,
  RELATION_AND_ID_PATH,
  RELATION_PATH,
  RelationAndIdDto,
  RelationDto,
  TransformAndValidatePipe,
  UserId,
  validateUnique,
} from '@webpackages/core';
import {
  AUTH_BEARER_NAME,
  DeletePermission,
  ReadPermission,
  UpdatePermission,
  WritePermission,
} from '@webpackages/auth';

@ApiBearerAuth(AUTH_BEARER_NAME)
@ApiTags('StoreController')
@Controller()
export class StoreController {
  uniqueFields = this.repo.metadata.uniques
    .map((e) => e.columns.pop()?.propertyName)
    .filter((e) => e) as string[];

  constructor(
    @InjectRepository(Store) private readonly repo: Repository<Store>
  ) {}

  async uniqueCheck(entity: any) {
    if (this.uniqueFields) {
      await validateUnique(this.repo, entity, this.uniqueFields);
    }
  }

  @ApiOperation({ summary: 'Store metadata' })
  @ReadPermission('store')
  @Get('store-meta')
  async meta() {
    return {
      count: await this.repo.count(),
    };
  }

  @ApiOperation({
    summary: 'Find all Store by query (paginator, order, search, and select)',
  })
  @ReadPermission('store')
  @Get('stores')
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
      where: [
        // { name: ILike(`%${search}%`),}
      ],
      select,
    });
  }

  @ApiOperation({ summary: 'Find Store by id' })
  @ReadPermission('store')
  @Get('store/:id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.repo.findOneBy({ id });
  }

  @ApiOperation({ summary: 'Save Store' })
  @WritePermission('store')
  @Post('store')
  async save(
    @Body(TransformAndValidatePipe) body: CreateStoreDto,
    @UserId() userId: number
  ) {
    await this.uniqueCheck(body);
    return await this.repo.save({
      ...body,
      createdBy: userId,
      updatedBy: userId,
    });
  }

  @ApiOperation({ summary: 'Update Store' })
  @UpdatePermission('store')
  @Put('store/:id')
  async udpate(
    @Param('id', ParseIntPipe) id: number,
    @Body(TransformAndValidatePipe) body: UpdateStoreDto,
    @UserId() userId: number
  ) {
    for (const u of this.uniqueFields) {
      const found = await this.repo.findOneBy({ [u]: (body as any)[u] });
      if (found?.id == id) continue;
      await this.uniqueCheck(body);
    }
    return await this.repo.update(id, { ...body, updatedBy: userId });
  }

  @ApiOperation({ summary: 'Delete Store by id' })
  @DeletePermission('store')
  @Delete('store/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.repo.delete(id);
  }

  @ApiOperation({
    summary: 'Add Store relation by relationName and realationId',
  })
  @UpdatePermission('store')
  @Put(`store/${RELATION_AND_ID_PATH}`)
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
    summary: 'Remove Store relation by id, relationName, and relationId',
  })
  @UpdatePermission('store')
  @Delete(`store/${RELATION_AND_ID_PATH}`)
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

  @ApiOperation({ summary: 'Set Store relation by id' })
  @UpdatePermission('store')
  @Post(`store/${RELATION_AND_ID_PATH}`)
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

  @ApiOperation({ summary: 'Unset Store relation by id' })
  @UpdatePermission('store')
  @Delete(`store/${RELATION_PATH}`)
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
