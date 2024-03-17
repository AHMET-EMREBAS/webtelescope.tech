import { Body, Query } from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';
import { Sample } from './entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  QueryDto,
  Validate,
  ParamId,
  ResourceController,
} from '@webpackages/core';
import { CreateSampleDto, UpdateSampleDto } from './dto';

const C = new ResourceController('sample', 'samples');

@C.Controller()
export class SampleController {
  constructor(
    @InjectRepository(Sample) private readonly repo: Repository<Sample>
  ) {}

  @C.Create()
  create(@Body(Validate()) entity: CreateSampleDto) {
    return this.repo.save(entity);
  }

  @C.Query()
  find(@Query(Validate()) query: QueryDto) {
    return this.repo.find(query as FindManyOptions<Sample>);
  }

  @C.FindById()
  findOneById(@ParamId() id: number) {
    return this.repo.findOneBy({ id });
  }

  @C.Update()
  update(@ParamId() id: number, @Body(Validate()) entity: UpdateSampleDto) {
    return this.repo.update(id, entity);
  }

  @C.Delete()
  delete(@ParamId() id: number) {
    return this.repo.delete(id);
  }
}
