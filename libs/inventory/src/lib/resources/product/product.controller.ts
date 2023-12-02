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
import { Product } from './entities';
import { CreateProductDto, UpdateProductDto } from './dtos';
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
@ApiTags('ProductController')
@Controller()
export class ProductController {
  uniqueFields = this.repo.metadata.uniques
    .map((e) => e.columns.pop()?.propertyName)
    .filter((e) => e) as string[];

  constructor(
    @InjectRepository(Product) private readonly repo: Repository<Product>
  ) {}

  async uniqueCheck(entity: any) {
    if (this.uniqueFields) {
      await validateUnique(this.repo, entity, this.uniqueFields);
    }
  }

  @ApiOperation({ summary: 'Product metadata' })
  @ReadPermission('product')
  @Get('product-meta')
  async meta() {
    return {
      count: await this.repo.count(),
    };
  }

  @ApiOperation({
    summary: 'Find all Product by query (paginator, order, search, and select)',
  })
  @ReadPermission('product')
  @Get('products')
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

  @ApiOperation({ summary: 'Find Product by id' })
  @ReadPermission('product')
  @Get('product/:id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.repo.findOneBy({ id });
  }

  @ApiOperation({ summary: 'Save Product' })
  @WritePermission('product')
  @Post('product')
  async save(
    @Body(TransformAndValidatePipe) body: CreateProductDto,
    @UserId() userId: number
  ) {
    await this.uniqueCheck(body);
    return await this.repo.save({
      ...body,
      createdBy: userId,
      updatedBy: userId,
    });
  }

  @ApiOperation({ summary: 'Update Product' })
  @UpdatePermission('product')
  @Put('product/:id')
  async udpate(
    @Param('id', ParseIntPipe) id: number,
    @Body(TransformAndValidatePipe) body: UpdateProductDto,
    @UserId() userId: number
  ) {
    for (const u of this.uniqueFields) {
      const found = await this.repo.findOneBy({ [u]: (body as any)[u] });
      if (found?.id == id) continue;
      await this.uniqueCheck(body);
    }
    return await this.repo.update(id, { ...body, updatedBy: userId });
  }

  @ApiOperation({ summary: 'Delete Product by id' })
  @DeletePermission('product')
  @Delete('product/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.repo.delete(id);
  }

  @ApiOperation({
    summary: 'Add Product relation by relationName and realationId',
  })
  @UpdatePermission('product')
  @Put(`product/${RELATION_AND_ID_PATH}`)
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
    summary: 'Remove Product relation by id, relationName, and relationId',
  })
  @UpdatePermission('product')
  @Delete(`product/${RELATION_AND_ID_PATH}`)
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

  @ApiOperation({ summary: 'Set Product relation by id' })
  @UpdatePermission('product')
  @Post(`product/${RELATION_AND_ID_PATH}`)
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

  @ApiOperation({ summary: 'Unset Product relation by id' })
  @UpdatePermission('product')
  @Delete(`product/${RELATION_PATH}`)
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
