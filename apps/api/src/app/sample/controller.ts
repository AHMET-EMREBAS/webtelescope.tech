import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Repository } from 'typeorm';
import { Sample } from './entity';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryDto } from '@webpackages/core';

@ApiTags('Sample')
@Controller()
export class SampleController {
  constructor(
    @InjectRepository(Sample) private readonly repo: Repository<Sample>
  ) {}

  @Get('samples')
  samples(@Query(new ValidationPipe({ transform: true })) query: QueryDto) {
    console.log(query);

    return this.repo.find(query as any);
  }
}
