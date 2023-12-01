/* eslint-disable @typescript-eslint/no-explicit-any */
import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { TransformAndValidatePipe } from '../pipes';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { ClassConstructor } from 'class-transformer';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Id, UserId } from '../params';
import {
  RELATION_AND_ID_PATH,
  RELATION_PATH,
  RelationAndIdDto,
  RelationDto,
} from '../dto';
import {
  AUTH_BEARER_NAME,
  SetPermission,
  deletePermission,
  updatePermission,
  writePermission,
} from '../auth';

export type SaveControllerOptions = {
  singularPath: string;
  entity: ClassConstructor<unknown>;
  createDto: ClassConstructor<unknown>;
  updateDto: ClassConstructor<unknown>;
};

export function WriteController(
  options: SaveControllerOptions
): ClassConstructor<any> {
  const { singularPath, createDto, updateDto, entity } = options;

  @ApiBearerAuth(AUTH_BEARER_NAME)
  @ApiTags(`${entity.name}Controller`)
  @Controller()
  class __Controller {
    constructor(
      @InjectRepository(entity) public readonly repo: Repository<any>
    ) {}

    @SetPermission(writePermission(entity.name))
    @Post(singularPath)
    @ApiBody({ type: createDto })
    async save(
      @Body(TransformAndValidatePipe) body: any,
      @UserId() userId: number
    ) {
      return await this.repo.save({
        ...body,
        createdBy: userId,
        updatedBy: userId,
      });
    }

    @SetPermission(updatePermission(entity.name))
    @Put(`${singularPath}/:id`)
    @ApiBody({ type: updateDto })
    async update(
      @Id() id: number,
      @Body(TransformAndValidatePipe) body: any,
      @UserId() userId: number
    ) {
      return await this.repo.update(id, { ...body, updatedId: userId });
    }

    @SetPermission(deletePermission(entity.name))
    @Delete(`${singularPath}/:id`)
    @ApiBody({ type: updateDto })
    async delete(@Id() id: number) {
      return await this.repo.delete(id);
    }

    @SetPermission(updatePermission(entity.name))
    @Put(`${singularPath}/${RELATION_AND_ID_PATH}`)
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

    @SetPermission(updatePermission(entity.name))
    @Delete(`${singularPath}/${RELATION_AND_ID_PATH}`)
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
        .remove(relationId);
    }

    @SetPermission(updatePermission(entity.name))
    @Post(`${singularPath}/${RELATION_AND_ID_PATH}`)
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

    @SetPermission(updatePermission(entity.name))
    @Delete(`${singularPath}/${RELATION_PATH}`)
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

  return __Controller;
}
