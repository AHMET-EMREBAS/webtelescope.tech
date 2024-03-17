import { Body, Query } from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';
import { <%- className %> } from './entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  QueryDto,
  Validate,
  ParamId,
  ResourceController,
} from '@webpackages/core';
import { Create<%- className %>Dto, Update<%- className %>Dto } from './dto';

const C = new ResourceController('<%- fileName %>', '<%- fileName %>s');

@C.Controller()
export class <%- className %>Controller {
  constructor(
    @InjectRepository(<%- className %>) private readonly repo: Repository<<%- className %>>
  ) {}

  @C.Create()
  create(@Body(Validate()) entity: Create<%- className %>Dto) {
    return this.repo.save(entity);
  }

  @C.Query()
  find(@Query(Validate()) query: QueryDto) {
    return this.repo.find(query as FindManyOptions<<%- className %>>);
  }

  @C.FindById()
  findOneById(@ParamId() id: number) {
    return this.repo.findOneBy({ id });
  }

  @C.Update()
  update(@ParamId() id: number, @Body(Validate()) entity: Update<%- className %>Dto) {
    return this.repo.update(id, entity);
  }

  @C.Delete()
  delete(@ParamId() id: number) {
    return this.repo.softDelete(id);
  }
}
