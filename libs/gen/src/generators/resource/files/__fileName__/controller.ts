import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FindManyOptions, Repository } from 'typeorm';
import { <%- className %> } from './entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  QueryDto,
  Validate,
  ParamId,
  API_BEARER_AUTH_NAME,
  DeleteResult,
  UpdateResult
} from '@webpackages/core';
import { Read<%- className %>Dto, Update<%- className %>Dto, Create<%- className %>Dto } from './dto';

@ApiTags('<%- className %>')
@ApiBearerAuth(API_BEARER_AUTH_NAME)
@Controller()
export class <%- className %>Controller {
  constructor(
    @InjectRepository(<%- className %>) private readonly repo: Repository<<%- className %>>
  ) {}

  @ApiOperation({ summary: 'Query <%- className %>s.' })
  @ApiOkResponse({ type: Read<%- className %>Dto , isArray:true })
  @Get('<%- fileName %>s')
  find<%- className %>s(@Query(Validate()) query: QueryDto) {
    return this.repo.find(query as FindManyOptions<<%- className %>>);
  }

  @ApiOperation({ summary: 'Find <%- className %> by id.' })
  @ApiOkResponse({ type: Read<%- className %>Dto })
  @Get('<%- fileName %>/:id')
  find<%- className %>ById(@ParamId() id: number) {
    return this.repo.findOneBy({ id });
  }

  @ApiOperation({ summary:'Save <%- className %>.'})
  @ApiCreatedResponse({ type:Read<%- className %>Dto })
  @Post('<%- fileName %>')
  save<%- className %>(@Body(Validate()) entity:Create<%- className %>Dto){ 
    return this.repo.save(entity);
  }

  @ApiOperation({ summary: 'Update <%- className %>.' })
  @ApiOkResponse({ type: UpdateResult })
  @Put('<%- fileName %>/:id')
  update<%- className %>(@ParamId() id: number, @Body(Validate()) entity: Update<%- className %>Dto) {
    return this.repo.update(id, entity);
  }

  @ApiOperation({ summary: 'Delete <%- className %>' })
  @ApiOkResponse({ type: DeleteResult })
  @Delete('<%- fileName %>/:id')
  delete<%- className %>(@ParamId() id: number) {
    return this.repo.softDelete(id);
  }
}
