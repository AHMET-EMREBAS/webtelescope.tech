import { Controller } from '@nestjs/common';
import {
  BaseEntity,
  Column,
  CreateQueryDto,
  Dto,
  Entity,
  Property,
} from '@webpackages/entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BasicController } from '@webpackages/rest';
import { PartialType } from '@nestjs/swagger';
@Entity()
export class Sample extends BaseEntity {
  @Property({ type: 'string' })
  @Column({ type: 'string' })
  name!: string;
}

@Dto()
export class QuerySampleDto extends CreateQueryDto(['name']) {}

@Controller()
export class AppController extends BasicController({
  createDto: Sample,
  updateDto: PartialType(Sample),
  entity: Sample,
  readDto: Sample,
  singularName: 'sample',
  pluralName: 'samples',
  queryDto: QuerySampleDto,
}) {
  constructor(
    @InjectRepository(Sample) private readonly repo: Repository<Sample>
  ) {
    super(repo);
    repo.save({ name: 'some 1' }).then();
    repo.save({ name: 'some 2' }).then();
    repo.save({ name: 'other 1' }).then();
    repo.save({ name: 'other 2' }).then();
  }
}
