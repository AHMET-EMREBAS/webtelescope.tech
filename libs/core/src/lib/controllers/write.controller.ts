/* eslint-disable @typescript-eslint/no-explicit-any */
import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { TransformAndValidatePipe } from '../pipes';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { ClassConstructor } from 'class-transformer';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Id } from '../params';
import {
  RELATION_AND_ID_PATH,
  RELATION_PATH,
  RelationAndIdDto,
  RelationDto,
} from '../dto';
import {
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

  @ApiBearerAuth()
  @ApiTags(`${entity.name}Controller`)
  @Controller(singularPath)
  class __Controller {
    constructor(
      @InjectRepository(entity) public readonly repo: Repository<any>
    ) {}

    @SetPermission(writePermission(entity.name))
    @Post()
    @ApiBody({ type: createDto })
    async save(@Body(TransformAndValidatePipe) body: any) {
      return await this.repo.save(body);
    }

    @SetPermission(updatePermission(entity.name))
    @Put(':id')
    @ApiBody({ type: updateDto })
    async update(@Id() id: number, @Body(TransformAndValidatePipe) body: any) {
      return await this.repo.update(id, body);
    }

    @SetPermission(deletePermission(entity.name))
    @Delete(':id')
    @ApiBody({ type: updateDto })
    async delete(@Id() id: number) {
      return await this.repo.delete(id);
    }

    @SetPermission(updatePermission(entity.name))
    @Put(RELATION_AND_ID_PATH)
    async add(@Param(TransformAndValidatePipe) relation: RelationAndIdDto) {
      const { id, relationId, relationName } = relation;
      return await this.repo
        .createQueryBuilder()
        .relation(relationName)
        .of(id)
        .add(relationId);
    }

    @SetPermission(updatePermission(entity.name))
    @Delete(RELATION_AND_ID_PATH)
    async remove(@Param(TransformAndValidatePipe) relation: RelationAndIdDto) {
      const { id, relationId, relationName } = relation;
      return await this.repo
        .createQueryBuilder()
        .relation(relationName)
        .of(id)
        .remove(relationId);
    }

    @SetPermission(updatePermission(entity.name))
    @Post(RELATION_AND_ID_PATH)
    async set(@Param(TransformAndValidatePipe) relation: RelationAndIdDto) {
      const { id, relationId, relationName } = relation;
      return await this.repo
        .createQueryBuilder()
        .relation(relationName)
        .of(id)
        .set(relationId);
    }

    @SetPermission(updatePermission(entity.name))
    @Delete(RELATION_PATH)
    async unset(@Param(TransformAndValidatePipe) relation: RelationDto) {
      const { id, relationName } = relation;
      return await this.repo
        .createQueryBuilder()
        .relation(relationName)
        .of(id)
        .set(null);
    }
  }

  return __Controller;
}
