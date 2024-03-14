import { BasicController } from '@webpackages/rest';
import { Sample } from './entity';
import {
  CreateSampleDto,
  QuerySampleDto,
  ReadSampleDto,
  UpdateSampleDto,
} from './dto';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags(SampleController.name)
@Controller()
export class SampleController extends BasicController({
  entity: Sample,
  createDto: CreateSampleDto,
  readDto: ReadSampleDto,
  updateDto: UpdateSampleDto,
  queryDto: QuerySampleDto,
  singularName: 'sample',
  pluralName: 'samples',
}) {}
