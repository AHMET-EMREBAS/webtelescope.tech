import { Body, Controller, Delete, Get, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FindManyOptions, Repository } from 'typeorm';
import { <%- className %> } from './entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  QueryDto,
  Validate,
  ParamId,
  API_BEARER_AUTH_NAME,
} from '@webpackages/core';
import { Update<%- className %>Dto } from './dto';

@ApiTags('<%- className %>')
@ApiBearerAuth(API_BEARER_AUTH_NAME)
@Controller()
export class <%- className %>Controller {
  constructor(
    @InjectRepository(<%- className %>) private readonly repo: Repository<<%- className %>>
  ) {}

  @ApiOperation({ summary: 'Query <%- fileName %>s.' })
  @Get('<%- fileName %>s')
  find(@Query(Validate()) query: QueryDto) {
    return this.repo.find(query as FindManyOptions<<%- className %>>);
  }

  @ApiOperation({ summary: 'Find <%- fileName %> by id.' })
  @Get('<%- fileName %>/:id')
  findOneById(@ParamId() id: number) {
    return this.repo.findOneBy({ id });
  }

  @ApiOperation({ summary: 'Update <%- fileName %>.' })
  @Put('<%- fileName %>/:id')
  update(@ParamId() id: number, @Body(Validate()) entity: Update<%- className %>Dto) {
    return this.repo.update(id, entity);
  }

  @ApiOperation({ summary: 'Delete <%- fileName %>' })
  @Delete('<%- fileName %>/:id')
  delete(@ParamId() id: number) {
    return this.repo.delete(id);
  }
}
