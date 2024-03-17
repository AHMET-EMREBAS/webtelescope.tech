import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ILike, Repository } from 'typeorm';
import { Sample } from './entity';
import { InjectRepository } from '@nestjs/typeorm';

@ApiTags('Sample')
@Controller()
export class SampleController {
  constructor(
    @InjectRepository(Sample) private readonly repo: Repository<Sample>
  ) {}

  @Get('samples')
  samples(@Query() query: unknown) {
    console.table({ query });

    return this.repo.find({
      order: {
        name: 'asc',
      },
      where: [],
    });
  }
}
