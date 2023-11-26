import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AUTH_TOKEN_NAME } from '@webpackages/common';
import { Permissions } from '@webpackages/auth';
import { ValidationPipe } from '@webpackages/rest';
import { CreateTaskDto, QueryTaskDto, UpdateTaskDto } from './dto';
import { TaskService } from './task.service';

@ApiBearerAuth(AUTH_TOKEN_NAME)
@Controller()
export class TaskController {
  constructor(protected readonly taskService: TaskService) {}

  @Permissions('task:read')
  @Get('tasks')
  async findAllTasks(@Query(ValidationPipe) query: QueryTaskDto) {
    return this.taskService.find(query);
  }

  @Permissions('task:read')
  @Get('task/:id')
  findTaskById(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.findOneById(id);
  }
  @Permissions('task:read')
  @Post('task')
  async save(@Body(ValidationPipe) entity: CreateTaskDto) {
    return this.taskService.save(entity);
  }

  @Permissions('task:update')
  @Put('task/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) entity: UpdateTaskDto
  ) {
    return this.taskService.update(id, entity);
  }

  @Permissions('task:delete')
  @Delete('task/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.delete(id);
  }
}
