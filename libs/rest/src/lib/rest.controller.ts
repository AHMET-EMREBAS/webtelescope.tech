/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClassConstructor } from 'class-transformer';
import { QueryDto } from './query.dto';
import {
  Body,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export type RestControllerOptions = {
  singularPath: string;
  pluralPath: string;
  entity: ClassConstructor<any>;
  view: ClassConstructor<any>;
  createDto: ClassConstructor<any>;
  updateDto: ClassConstructor<any>;
};

export function RestController(options: RestControllerOptions) {
  const { singularPath, pluralPath, entity, view, createDto, updateDto } =
    options;

  class __RestController {
    readonly columns: string[] = this.repo.metadata.columns.map(
      (e) => e.propertyName
    );
    readonly uniqueColumns: string[] = this.repo.metadata.uniques
      .map((e) => e.givenName)
      .filter((e) => e) as string[];

    constructor(
      @InjectRepository(entity) public readonly repo: Repository<any>,
      @InjectRepository(view) public readonly viewRepo: Repository<any>
    ) {
      console.log(this.columns, this.uniqueColumns);
    }

    async checkUnique(entity: any) {
      for (const u of this.uniqueColumns) {
        const found = await this.repo.findOneBy({ [u]: entity[u] });
        if (found) {
          throw new UnprocessableEntityException(`${u} must be unique!`);
        }
      }
    }

    @Get(pluralPath)
    find(query: QueryDto) {
      const { orderBy, orderDir, search, skip, take, withDeleted } = query;

      const where = search
        ? this.columns
            .map((e) => ({ [e]: ILike(`%${search}%`) }))
            .reduce((p, c) => ({ ...p, ...c }))
        : {};
      const queryBuilder = this.viewRepo
        .createQueryBuilder()

        .limit(take)
        .offset(skip)
        .orderBy(orderBy || 'id', orderDir || 'ASC')
        .where(where);

      if (withDeleted) queryBuilder.withDeleted();

      return queryBuilder.execute();
    }

    @Get(`${singularPath}/:id`)
    findOneById(@Param('id', ParseIntPipe) id: number) {
      return this.repo.findOneBy({ id });
    }

    @Post(singularPath)
    async save(
      @Body(
        new ValidationPipe({
          expectedType: createDto,
          transformOptions: { exposeUnsetFields: false },
        })
      )
      entity: any
    ) {
      await this.checkUnique(entity);
      return await this.repo.save(entity);
    }

    @Put(`${singularPath}/:id`)
    async update(
      @Param('id', ParseIntPipe) id: number,
      @Body(
        new ValidationPipe({
          expectedType: updateDto,
          transformOptions: { exposeUnsetFields: false },
        })
      )
      entity: any
    ) {
      return await this.save({ id, ...entity });
    }

    @Delete(`${singularPath}/:id`)
    delete(@Param('id', ParseIntPipe) id: number) {
      return this.repo.delete(id);
    }

    @Delete(`${singularPath}/:id/:relationName/:relationId`)
    add(
      @Param('id', ParseIntPipe) id: number,
      @Param('relationName', ParseIntPipe) relationName: string,
      @Param('relationId', ParseIntPipe) relationId: number
    ) {
      return this.repo
        .createQueryBuilder()
        .relation(relationName)
        .of(id)
        .add(relationId);
    }

    @Delete(`${singularPath}/:id/:relationName/:relationId`)
    remove(
      @Param('id', ParseIntPipe) id: number,
      @Param('relationName', ParseIntPipe) relationName: string,
      @Param('relationId', ParseIntPipe) relationId: number
    ) {
      return this.repo
        .createQueryBuilder()
        .relation(relationName)
        .of(id)
        .remove(relationId);
    }

    @Post(`${singularPath}/:id/:relationName/:relationId`)
    set(
      @Param('id', ParseIntPipe) id: number,
      @Param('relationName', ParseIntPipe) relationName: string,
      @Param('relationId', ParseIntPipe) relationId: number
    ) {
      return this.repo
        .createQueryBuilder()
        .relation(relationName)
        .of(id)
        .set(relationId);
    }

    @Delete(`${singularPath}/:id/:relationName`)
    unset(
      @Param('id', ParseIntPipe) id: number,
      @Param('relationName', ParseIntPipe) relationName: string
    ) {
      return this.repo
        .createQueryBuilder()
        .relation(relationName)
        .of(id)
        .set(null);
    }
  }

  return __RestController;
}
