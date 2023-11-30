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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AUTH_TOKEN_NAME } from '@webpackages/common';
import { SetPermission } from '@webpackages/auth';
import { ValidationPipe, QueryDto } from '@webpackages/core';
import { CreateSampleDto, UpdateSampleDto } from './dto';
import { SampleService } from './sample.service';

@ApiBearerAuth(AUTH_TOKEN_NAME)
@ApiTags('SampleController')
@Controller()
export class SampleController {
  constructor(protected readonly sampleService: SampleService) {}

  @SetPermission('sample:read')
  @Get('samples')
  async findAllSamples(@Query(ValidationPipe) query: QueryDto) {
    return this.sampleService.find(query);
  }

  @SetPermission('sample:read')
  @Get('sample/:id')
  findSampleById(@Param('id', ParseIntPipe) id: number) {
    return this.sampleService.findOneById(id);
  }
  @SetPermission('sample:read')
  @Post('sample')
  async save(@Body(ValidationPipe) entity: CreateSampleDto) {
    return this.sampleService.save(entity);
  }

  @SetPermission('sample:update')
  @Put('sample/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) entity: UpdateSampleDto
  ) {
    return this.sampleService.update(id, entity);
  }

  @SetPermission('sample:delete')
  @Delete('sample/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.sampleService.delete(id);
  }
}
