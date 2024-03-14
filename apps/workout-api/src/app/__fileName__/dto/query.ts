import { CreateQueryDto, Dto } from '@webpackages/entity';
import { Sample } from '../entity';

@Dto()
export class QuerySampleDto extends CreateQueryDto<Sample>(['name']) {}
