/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, Get, Query } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Id } from '../params';
import { TransformAndValidatePipe } from '../pipes';
import { QueryDto } from '../dto';
import { ApiTags } from '@nestjs/swagger';
import { SetPermission, readPermission } from '../auth';

export type QueryControllerOptions = {
  singularPath: string;
  pluralPath: string;
  searchFields: string[];
  entity: ClassConstructor<unknown>;
};

export function QueryController(
  options: QueryControllerOptions
): ClassConstructor<any> {
  const { pluralPath, singularPath, entity, searchFields } = options;

  @SetPermission(readPermission(entity.name))
  @ApiTags(`${entity.name}Controller`)
  @Controller()
  class __Controller {
    constructor(
      @InjectRepository(entity) public readonly repo: Repository<any>
    ) {}

    @Get(pluralPath)
    async findAll(@Query(TransformAndValidatePipe) query: QueryDto) {
      const { orderBy, orderDir, search, skip, take, withDeleted } = query;
      let order = {};
      let where = {};
      if (orderBy && orderDir) order = { [orderBy]: orderDir };

      if (search)
        where = searchFields.map((e) => ({ [e]: ILike(`%${search}%`) }));

      return await this.repo.find({
        take,
        skip,
        withDeleted,
        where,
        order,
      });
    }

    @Get(`${singularPath}/:id`)
    findOneById(@Id() id: number) {
      return this.repo.findOneBy({ id });
    }
  }

  return __Controller;
}
