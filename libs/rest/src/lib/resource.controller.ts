/* eslint-disable @typescript-eslint/no-explicit-any */
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ResourceControllerMethods } from './resource-controller-methods';
import { ResourceControllerOptions } from './controller-options';
import { BodyParam, ParamId, QueryParam } from './param-decorators';
import { ClassConstructor } from 'class-transformer';
import { ApiTags, PickType } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { ResourceName } from './metadata';

export function BasicController(
  options: ResourceControllerOptions
): ClassConstructor<any> {
  const M = new ResourceControllerMethods(options);

  @ApiTags(options.resourceName)
  @ResourceName(options.resourceName)
  @Controller()
  class __ResourceController {
    constructor(
      @InjectRepository(options.entity) public readonly repo: Repository<any>
    ) {}

    @M.CREATE()
    CREATE(@BodyParam(options.createDto) body: any) {
      return this.repo.save(body);
    }

    @M.FIND_ALL()
    FIND_ALL(@QueryParam(options.queryDto) query: any) {
      return this.repo.find(query);
    }

    @M.FIND_ONE_BY_ID()
    FIND_ONE_BY_ID(
      @ParamId() id: number,
      @QueryParam(PickType(options.queryDto, ['select', 'withDeleted']))
      query: any
    ) {
      return this.repo.findOne({ ...query, where: { id } });
    }

    @M.UPDATE_ONE_BY_ID()
    UPDATE_ONE_BY_ID(
      @ParamId() id: number,
      @BodyParam(options.updateDto) entity: any
    ) {
      return this.repo.update(id, entity);
    }

    @M.DELETE_ONE_BY_ID()
    DELETE_ONE_BY_ID(@ParamId() id: number) {
      return this.repo.delete(id);
    }

    @M.COUNT()
    COUNT(@QueryParam(PickType(options.queryDto, ['where'])) queryDto: any) {
      return this.repo.count(queryDto);
    }
  }

  return __ResourceController;
}
