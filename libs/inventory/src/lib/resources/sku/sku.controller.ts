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
import { Sku } from './entities';
import { CreateSkuDto, UpdateSkuDto } from './dtos';
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
@ApiTags('SkuController')
@Controller()
export class SkuController {
  uniqueFields = this.repo.metadata.uniques
    .map((e) => e.columns.pop()?.propertyName)
    .filter((e) => e) as string[];

  constructor(@InjectRepository(Sku) private readonly repo: Repository<Sku>) {}

  async uniqueCheck(entity: any) {
    if (this.uniqueFields) {
      await validateUnique(this.repo, entity, this.uniqueFields);
    }
  }

  @ApiOperation({ summary: 'Sku metadata' })
  @ReadPermission('sku')
  @Get('sku-meta')
  async meta() {
    return {
      count: await this.repo.count(),
    };
  }

  @ApiOperation({
    summary: 'Find all Sku by query (paginator, order, search, and select)',
  })
  @ReadPermission('sku')
  @Get('skus')
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

  @ApiOperation({ summary: 'Find Sku by id' })
  @ReadPermission('sku')
  @Get('sku/:id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.repo.findOneBy({ id });
  }

  @ApiOperation({ summary: 'Save Sku' })
  @WritePermission('sku')
  @Post('sku')
  async save(
    @Body(TransformAndValidatePipe) body: CreateSkuDto,
    @UserId() userId: number
  ) {
    await this.uniqueCheck(body);
    return await this.repo.save({
      ...body,
      createdBy: userId,
      updatedBy: userId,
    });
  }

  @ApiOperation({ summary: 'Update Sku' })
  @UpdatePermission('sku')
  @Put('sku/:id')
  async udpate(
    @Param('id', ParseIntPipe) id: number,
    @Body(TransformAndValidatePipe) body: UpdateSkuDto,
    @UserId() userId: number
  ) {
    for (const u of this.uniqueFields) {
      const found = await this.repo.findOneBy({ [u]: (body as any)[u] });
      if (found?.id == id) continue;
      await this.uniqueCheck(body);
    }
    return await this.repo.update(id, { ...body, updatedBy: userId });
  }

  @ApiOperation({ summary: 'Delete Sku by id' })
  @DeletePermission('sku')
  @Delete('sku/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.repo.delete(id);
  }

  @ApiOperation({ summary: 'Add Sku relation by relationName and realationId' })
  @UpdatePermission('sku')
  @Put(`sku/${RELATION_AND_ID_PATH}`)
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
    summary: 'Remove Sku relation by id, relationName, and relationId',
  })
  @UpdatePermission('sku')
  @Delete(`sku/${RELATION_AND_ID_PATH}`)
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

  @ApiOperation({ summary: 'Set Sku relation by id' })
  @UpdatePermission('sku')
  @Post(`sku/${RELATION_AND_ID_PATH}`)
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

  @ApiOperation({ summary: 'Unset Sku relation by id' })
  @UpdatePermission('sku')
  @Delete(`sku/${RELATION_PATH}`)
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
