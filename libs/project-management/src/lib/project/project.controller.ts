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
import { CreateProjectDto, QueryProjectDto, UpdateProjectDto } from './dto';
import { ProjectService } from './project.service';

@ApiBearerAuth(AUTH_TOKEN_NAME)
@Controller()
export class ProjectController {
  constructor(protected readonly projectService: ProjectService) {}

  @Permissions('project:read')
  @Get('projects')
  async findAllProjects(@Query(ValidationPipe) query: QueryProjectDto) {
    return this.projectService.find(query);
  }

  @Permissions('project:read')
  @Get('project/:id')
  findProjectById(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.findOneById(id);
  }
  @Permissions('project:read')
  @Post('project')
  async save(@Body(ValidationPipe) entity: CreateProjectDto) {
    return this.projectService.save(entity);
  }

  @Permissions('project:update')
  @Put('project/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) entity: UpdateProjectDto
  ) {
    return this.projectService.update(id, entity);
  }

  @Permissions('project:delete')
  @Delete('project/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.delete(id);
  }
}
