import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';
import { Sample } from './entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  QueryDto,
  IdParam,
  BearerAccess,
  QueryParam,
  BodyParam,
  SingleQueryDto,
} from '@webpackages/core';
import { CreateSampleDto, UpdateSampleDto } from './dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags(SampleController.name)
@BearerAccess()
@Controller()
export class SampleController {
  constructor(
    @InjectRepository(Sample) private readonly repo: Repository<Sample>
  ) {}

  @ApiOperation({ summary: 'Create sample' })
  @ApiCreatedResponse({ description: 'Success' })
  @ApiUnauthorizedResponse()
  @Post('sample')
  async create(@BodyParam() entity: CreateSampleDto) {
    return await this.repo.save(entity);
  }

  @ApiOperation({ summary: 'Query samples' })
  @ApiOkResponse({ description: 'Success' })
  @ApiUnauthorizedResponse()
  @Get('samples')
  find(@QueryParam() query: QueryDto<Sample>) {
    return this.repo.find(query as FindManyOptions<Sample>);
  }

  @ApiOperation({ summary: 'Find sample by id' })
  @ApiOkResponse({ description: 'Success' })
  @ApiUnauthorizedResponse()
  @Get('sample/:id')
  findOneById(
    @IdParam() id: number,
    @QueryParam() query: SingleQueryDto<Sample>
  ) {
    return this.repo.findOne({ where: { id }, ...query });
  }

  @ApiOperation({ summary: 'Update sample by id' })
  @ApiOkResponse({ description: 'Success' })
  @ApiUnauthorizedResponse()
  @Put('sample/:id')
  update(@IdParam() id: number, @BodyParam() entity: UpdateSampleDto) {
    return this.repo.update(id, entity);
  }

  @ApiOperation({ summary: 'Delete sample by id' })
  @ApiOkResponse({ description: 'Success' })
  @ApiUnauthorizedResponse()
  @Delete('sample/:id')
  delete(@IdParam() id: number) {
    return this.repo.softDelete(id);
  }
}
