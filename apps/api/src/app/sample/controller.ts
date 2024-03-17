import { Body, Controller, Delete, Get, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FindManyOptions, Repository } from 'typeorm';
import { Sample } from './entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  QueryDto,
  Validate,
  ParamId,
  API_BEARER_AUTH_NAME,
} from '@webpackages/core';
import { UpdateSampleDto } from './dto';

@ApiTags('Sample')
@ApiBearerAuth(API_BEARER_AUTH_NAME)
@Controller()
export class SampleController {
  constructor(
    @InjectRepository(Sample) private readonly repo: Repository<Sample>
  ) {}

  @ApiOperation({ summary: 'Query samples.' })
  @Get('samples')
  find(@Query(Validate()) query: QueryDto) {
    return this.repo.find(query as FindManyOptions<Sample>);
  }

  @ApiOperation({ summary: 'Find sample by id.' })
  @Get('sample/:id')
  findOneById(@ParamId() id: number) {
    return this.repo.findOneBy({ id });
  }

  @ApiOperation({ summary: 'Update sample.' })
  @Put('sample/:id')
  update(@ParamId() id: number, @Body(Validate()) entity: UpdateSampleDto) {
    return this.repo.update(id, entity);
  }

  @ApiOperation({ summary: 'Delete sample' })
  @Delete('sample/:id')
  delete(@ParamId() id: number) {
    return this.repo.delete(id);
  }
}
