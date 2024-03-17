import { Body, Query } from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';
import { Todo } from './entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  QueryDto,
  Validate,
  ParamId,
  ResourceController,
} from '@webpackages/core';
import { CreateTodoDto, UpdateTodoDto } from './dto';

const C = new ResourceController('todo', 'todos');

@C.Controller()
export class TodoController {
  constructor(
    @InjectRepository(Todo) private readonly repo: Repository<Todo>
  ) {}

  @C.Create()
  create(@Body(Validate()) entity: CreateTodoDto) {
    return this.repo.save(entity);
  }

  @C.Query()
  find(@Query(Validate()) query: QueryDto) {
    return this.repo.find(query as FindManyOptions<Todo>);
  }

  @C.FindById()
  findOneById(@ParamId() id: number) {
    return this.repo.findOneBy({ id });
  }

  @C.Update()
  update(@ParamId() id: number, @Body(Validate()) entity: UpdateTodoDto) {
    return this.repo.update(id, entity);
  }

  @C.Delete()
  delete(@ParamId() id: number) {
    return this.repo.softDelete(id);
  }
}
