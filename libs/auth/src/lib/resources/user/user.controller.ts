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
  AUTH_BEARER_NAME,
  DeletePermission,
  QueryDto,
  RELATION_AND_ID_PATH,
  RELATION_PATH,
  ReadPermission,
  RelationAndIdDto,
  RelationDto,
  TransformAndValidatePipe,
  UpdatePermission,
  UserId,
  WritePermission,
} from '@webpackages/core';
import { ILike, Repository } from 'typeorm';
import { User } from './entities';
import { CreateUserDto, UpdateUserDto } from './dtos';
import { InjectRepository } from '@nestjs/typeorm';

@ApiBearerAuth(AUTH_BEARER_NAME)
@ApiTags('UserController')
@Controller()
export class UserController {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>
  ) {}

  @ReadPermission('user')
  @Get('users')
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
  @ReadPermission('user')
  @Get('user/:id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.repo.findOneBy({ id });
  }

  @WritePermission('user')
  @Post('user')
  async save(
    @Body(TransformAndValidatePipe) body: CreateUserDto,
    @UserId() userId: number
  ) {
    return await this.repo.save({
      ...body,
      createdBy: userId,
      updatedBy: userId,
    });
  }

  @UpdatePermission('user')
  @Put('user/:id')
  udpate(
    @Param('id', ParseIntPipe) id: number,
    @Body(TransformAndValidatePipe) body: UpdateUserDto,
    @UserId() userId: number
  ) {
    return this.repo.update(id, { ...body, updatedBy: userId });
  }

  @DeletePermission('user')
  @Delete('user/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.repo.delete(id);
  }

  @UpdatePermission('user')
  @Put(`user/${RELATION_AND_ID_PATH}`)
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

  @UpdatePermission('user')
  @Delete(`user/${RELATION_AND_ID_PATH}`)
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

  @UpdatePermission('user')
  @Post(`user/${RELATION_AND_ID_PATH}`)
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

  @UpdatePermission('user')
  @Delete(`user/${RELATION_PATH}`)
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
