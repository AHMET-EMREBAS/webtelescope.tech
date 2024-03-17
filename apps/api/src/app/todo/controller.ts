import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FindManyOptions, Repository } from 'typeorm';
import { Todo } from './entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  QueryDto,
  Validate,
  ParamId,
  API_BEARER_AUTH_NAME,
  DeleteResult,
  UpdateResult,
} from '@webpackages/core';
import { ReadTodoDto, UpdateTodoDto, CreateTodoDto } from './dto';

@ApiTags('Todo')
@ApiBearerAuth(API_BEARER_AUTH_NAME)
@Controller()
export class TodoController {
  constructor(
    @InjectRepository(Todo) private readonly repo: Repository<Todo>
  ) {}

  @ApiOperation({ summary: 'Query Todos.' })
  @ApiOkResponse({ type: ReadTodoDto, isArray: true })
  @Get('todos')
  findTodos(@Query(Validate()) query: QueryDto) {
    return this.repo.find(query as FindManyOptions<Todo>);
  }

  @ApiOperation({ summary: 'Find Todo by id.' })
  @ApiOkResponse({ type: ReadTodoDto })
  @Get('todo/:id')
  findTodoById(@ParamId() id: number) {
    return this.repo.findOneBy({ id });
  }

  @ApiOperation({ summary: 'Save Todo.' })
  @ApiCreatedResponse({ type: ReadTodoDto })
  @Post('todo')
  saveTodo(@Body(Validate()) entity: CreateTodoDto) {
    return this.repo.save(entity);
  }

  @ApiOperation({ summary: 'Update Todo.' })
  @ApiOkResponse({ type: UpdateResult })
  @Put('todo/:id')
  updateTodo(@ParamId() id: number, @Body(Validate()) entity: UpdateTodoDto) {
    return this.repo.update(id, entity);
  }

  @ApiOperation({ summary: 'Delete Todo' })
  @ApiOkResponse({ type: DeleteResult })
  @Delete('todo/:id')
  deleteTodo(@ParamId() id: number) {
    return this.repo.softDelete(id);
  }
}
