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
import { CreateSprintDto, QuerySprintDto, UpdateSprintDto } from './dto';
import { SprintService } from './sprint.service';

@ApiBearerAuth(AUTH_TOKEN_NAME)
@Controller()
export class SprintController {
  constructor(protected readonly sprintService: SprintService) {}

  @Permissions('sprint:read')
  @Get('sprints')
  async findAllSprints(@Query(ValidationPipe) query: QuerySprintDto) {
    return this.sprintService.find(query);
  }

  @Permissions('sprint:read')
  @Get('sprint/:id')
  findSprintById(@Param('id', ParseIntPipe) id: number) {
    return this.sprintService.findOneById(id);
  }
  @Permissions('sprint:read')
  @Post('sprint')
  async save(@Body(ValidationPipe) entity: CreateSprintDto) {
    return this.sprintService.save(entity);
  }

  @Permissions('sprint:update')
  @Put('sprint/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) entity: UpdateSprintDto
  ) {
    return this.sprintService.update(id, entity);
  }

  @Permissions('sprint:delete')
  @Delete('sprint/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.sprintService.delete(id);
  }
}
