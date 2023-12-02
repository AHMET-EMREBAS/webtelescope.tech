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
import { Category } from './entities';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos';
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
@ApiTags('CategoryController')
@Controller()
export class CategoryController {
  uniqueFields = this.repo.metadata.uniques
    .map((e) => e.columns.pop()?.propertyName)
    .filter((e) => e) as string[];

  constructor(
    @InjectRepository(Category) private readonly repo: Repository<Category>
  ) {}

  async uniqueCheck(entity: any) {
    if (this.uniqueFields) {
      await validateUnique(this.repo, entity, this.uniqueFields);
    }
  }

  @ApiOperation({ summary: 'Category metadata' })
  @ReadPermission('category')
  @Get('category-meta')
  async meta() {
    return {
      count: await this.repo.count(),
    };
  }

  @ApiOperation({
    summary:
      'Find all Category by query (paginator, order, search, and select)',
  })
  @ReadPermission('category')
  @Get('categories')
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
        // name: ILike(`%${search}%`),
      },
      select,
    });
  }

  @ApiOperation({ summary: 'Find Category by id' })
  @ReadPermission('category')
  @Get('category/:id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.repo.findOneBy({ id });
  }

  @ApiOperation({ summary: 'Save Category' })
  @WritePermission('category')
  @Post('category')
  async save(
    @Body(TransformAndValidatePipe) body: CreateCategoryDto,
    @UserId() userId: number
  ) {
    await this.uniqueCheck(body);
    return await this.repo.save({
      ...body,
      createdBy: userId,
      updatedBy: userId,
    });
  }

  @ApiOperation({ summary: 'Update Category' })
  @UpdatePermission('category')
  @Put('category/:id')
  async udpate(
    @Param('id', ParseIntPipe) id: number,
    @Body(TransformAndValidatePipe) body: UpdateCategoryDto,
    @UserId() userId: number
  ) {
    await this.uniqueCheck(body);
    return await this.repo.update(id, { ...body, updatedBy: userId });
  }

  @ApiOperation({ summary: 'Delete Category by id' })
  @DeletePermission('category')
  @Delete('category/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.repo.delete(id);
  }

  @ApiOperation({
    summary: 'Add Category relation by relationName and realationId',
  })
  @UpdatePermission('category')
  @Put(`category/${RELATION_AND_ID_PATH}`)
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
    summary: 'Remove Category relation by id, relationName, and relationId',
  })
  @UpdatePermission('category')
  @Delete(`category/${RELATION_AND_ID_PATH}`)
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

  @ApiOperation({ summary: 'Set Category relation by id' })
  @UpdatePermission('category')
  @Post(`category/${RELATION_AND_ID_PATH}`)
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

  @ApiOperation({ summary: 'Unset Category relation by id' })
  @UpdatePermission('category')
  @Delete(`category/${RELATION_PATH}`)
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
