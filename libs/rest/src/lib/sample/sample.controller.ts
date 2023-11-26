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
import { CreateSampleDto, QuerySampleDto, UpdateSampleDto } from './dto';
import { SampleService } from './sample.service';

@ApiBearerAuth(AUTH_TOKEN_NAME)
@Controller()
export class SampleController {
  constructor(protected readonly sampleService: SampleService) {}

  @Permissions('sample:read')
  @Get('samples')
  async findAllSamples(@Query(ValidationPipe) query: QuerySampleDto) {
    return this.sampleService.find(query);
  }

  @Permissions('sample:read')
  @Get('sample/:id')
  findSampleById(@Param('id', ParseIntPipe) id: number) {
    return this.sampleService.findOneById(id);
  }
  @Permissions('sample:read')
  @Post('sample')
  async save(@Body(ValidationPipe) entity: CreateSampleDto) {
    return this.sampleService.save(entity);
  }

  @Permissions('sample:update')
  @Put('sample/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) entity: UpdateSampleDto
  ) {
    return this.sampleService.update(id, entity);
  }

  @Permissions('sample:delete')
  @Delete('sample/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.sampleService.delete(id);
  }
}
