import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Repository } from 'typeorm';
import { Sample } from './entity';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryDto, Validate } from '@webpackages/core';

@ApiTags('Sample')
@Controller()
export class SampleController {
  constructor(
    @InjectRepository(Sample) private readonly repo: Repository<Sample>
  ) {}

  @Get('samples')
  samples(@Query(Validate()) query: QueryDto) {
    console.log(query);
    console.log(query.where);
    return this.repo.find(query as any);
  }
}
