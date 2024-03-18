import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';
import { <%- className %> } from './entity';
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
import { Create<%- className %>Dto, Update<%- className %>Dto } from './dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags(<%- className %>Controller.name)
@BearerAccess()
@Controller()
export class <%- className %>Controller {
  constructor(
    @InjectRepository(<%- className %>) private readonly repo: Repository<<%- className %>>
  ) {}

  @ApiOperation({ summary: 'Create <%- fileName %>' })
  @ApiCreatedResponse({ description: 'Success' })
  @ApiUnauthorizedResponse()
  @Post('<%- fileName %>')
  async create(@BodyParam() entity: Create<%- className %>Dto) {
    return await this.repo.save(entity);
  }

  @ApiOperation({ summary: 'Query <%- fileName %>s' })
  @ApiOkResponse({ description: 'Success' })
  @ApiUnauthorizedResponse()
  @Get('<%- fileName %>s')
  find(@QueryParam() query: QueryDto<<%- className %>>) {
    return this.repo.find(query as FindManyOptions<<%- className %>>);
  }

  @ApiOperation({ summary: 'Find <%- fileName %> by id' })
  @ApiOkResponse({ description: 'Success' })
  @ApiUnauthorizedResponse()
  @Get('<%- fileName %>/:id')
  findOneById(
    @IdParam() id: number,
    @QueryParam() query: SingleQueryDto<<%- className %>>
  ) {
    return this.repo.findOne({ where: { id }, ...query });
  }

  @ApiOperation({ summary: 'Query <%- fileName %>s' })
  @ApiOkResponse({ description: 'Success' })
  @ApiUnauthorizedResponse()
  @Get('<%- fileName %>s')
  count(@QueryParam() query: CountQueryDto) {
    return this.repo.count(query);
  }

  @ApiOperation({ summary: 'Update <%- fileName %> by id' })
  @ApiOkResponse({ description: 'Success' })
  @ApiUnauthorizedResponse()
  @Put('<%- fileName %>/:id')
  update(@IdParam() id: number, @BodyParam() entity: Update<%- className %>Dto) {
    return this.repo.update(id, entity);
  }

  @ApiOperation({ summary: 'Delete <%- fileName %> by id' })
  @ApiOkResponse({ description: 'Success' })
  @ApiUnauthorizedResponse()
  @Delete('<%- fileName %>/:id')
  delete(@IdParam() id: number) {
    return this.repo.softDelete(id);
  }
}
