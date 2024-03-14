import { BasicController } from '@webpackages/rest';
import { Sample } from './entity';
import {
  CreateSampleDto,
  QuerySampleDto,
  ReadSampleDto,
  UpdateSampleDto,
} from './dto';

export class SampleController extends BasicController({
  resourceName: 'SampleController',
  singularName: 'sample',
  pluralName: 'samples',
  entity: Sample,
  createDto: CreateSampleDto,
  readDto: ReadSampleDto,
  updateDto: UpdateSampleDto,
  queryDto: QuerySampleDto,
}) {}
