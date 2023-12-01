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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
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
} from '../../auth';

import { ILike, Repository } from 'typeorm';
import { Permission } from './entities';
import { CreatePermissionDto, UpdatePermissionDto } from './dtos';
import { InjectRepository } from '@nestjs/typeorm';

@ApiBearerAuth(AUTH_BEARER_NAME)
@ApiTags('PermissionController')
@Controller()
export class PermissionController {
  constructor(
    @InjectRepository(Permission) private readonly repo: Repository<Permission>
  ) {}

  @ReadPermission('permission')
  @Get('permissions')
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
  @ReadPermission('permission')
  @Get('permission/:id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.repo.findOneBy({ id });
  }

  @WritePermission('permission')
  @Post('permission')
  async save(
    @Body(TransformAndValidatePipe) body: CreatePermissionDto,
    @UserId() userId: number
  ) {
    return await this.repo.save({
      ...body,
      createdBy: userId,
      updatedBy: userId,
    });
  }

  @UpdatePermission('permission')
  @Put('permission/:id')
  udpate(
    @Param('id', ParseIntPipe) id: number,
    @Body(TransformAndValidatePipe) body: UpdatePermissionDto,
    @UserId() userId: number
  ) {
    return this.repo.update(id, { ...body, updatedBy: userId });
  }

  @DeletePermission('permission')
  @Delete('permission/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.repo.delete(id);
  }

  @UpdatePermission('permission')
  @Put(`permission/${RELATION_AND_ID_PATH}`)
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

  @UpdatePermission('permission')
  @Delete(`permission/${RELATION_AND_ID_PATH}`)
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

  @UpdatePermission('permission')
  @Post(`permission/${RELATION_AND_ID_PATH}`)
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

  @UpdatePermission('permission')
  @Delete(`permission/${RELATION_PATH}`)
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
