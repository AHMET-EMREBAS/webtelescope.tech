import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';
import { Todo } from './entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  QueryDto,
  IdParam,
  BearerAccess,
  QueryParam,
  BodyParam,
  SingleQueryDto,
  CountQueryDto,
} from '@webpackages/core';
import { CreateTodoDto, UpdateTodoDto } from './dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags(TodoController.name)
@BearerAccess()
@Controller()
export class TodoController {
  constructor(
    @InjectRepository(Todo) private readonly repo: Repository<Todo>
  ) {}

  @ApiOperation({ summary: 'Create todo' })
  @ApiCreatedResponse({ description: 'Success' })
  @ApiUnauthorizedResponse()
  @Post('todo')
  async create(@BodyParam() entity: CreateTodoDto) {
    return await this.repo.save(entity);
  }

  @ApiOperation({ summary: 'Query todos' })
  @ApiOkResponse({ description: 'Success' })
  @ApiUnauthorizedResponse()
  @Get('todos')
  find(@QueryParam() query: QueryDto<Todo>) {
    return this.repo.find(query as FindManyOptions<Todo>);
  }

  @ApiOperation({ summary: 'Find todo by id' })
  @ApiOkResponse({ description: 'Success' })
  @ApiUnauthorizedResponse()
  @Get('todo/:id')
  findOneById(
    @IdParam() id: number,
    @QueryParam() query: SingleQueryDto<Todo>
  ) {
    return this.repo.findOne({ where: { id }, ...query });
  }

  @ApiOperation({ summary: 'Query todos' })
  @ApiOkResponse({ description: 'Success' })
  @ApiUnauthorizedResponse()
  @Get('todos')
  count(@QueryParam() query: CountQueryDto) {
    return this.repo.count(query);
  }

  @ApiOperation({ summary: 'Update todo by id' })
  @ApiOkResponse({ description: 'Success' })
  @ApiUnauthorizedResponse()
  @Put('todo/:id')
  update(@IdParam() id: number, @BodyParam() entity: UpdateTodoDto) {
    return this.repo.update(id, entity);
  }

  @ApiOperation({ summary: 'Delete todo by id' })
  @ApiOkResponse({ description: 'Success' })
  @ApiUnauthorizedResponse()
  @Delete('todo/:id')
  delete(@IdParam() id: number) {
    return this.repo.softDelete(id);
  }
}
