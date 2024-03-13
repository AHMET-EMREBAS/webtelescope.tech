import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { BaseEntity, Column, Entity, QueryDto } from '@webpackages/entity';
import { AppService } from './app.service';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Entity()
export class Sample extends BaseEntity {
  @Column({ type: 'string' }) name!: string;
}

@Controller()
export class AppController {
  constructor(
    @InjectRepository(Sample) private readonly repo: Repository<Sample>
  ) {
    repo.save({ name: 'some 1' }).then();
    repo.save({ name: 'some 2' }).then();
    repo.save({ name: 'other 1' }).then();
    repo.save({ name: 'other 2' }).then();
  }

  @Get()
  getData(
    @Query(new ValidationPipe({ transform: true }))
    query: QueryDto
  ) {
    console.log(query);

    console.log(query.where);
    return this.repo.find(query as any);
  }
}
