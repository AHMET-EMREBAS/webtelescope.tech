import { Exclude } from 'class-transformer';
import { QueryDto } from '@webpackages/rest';

@Exclude()
export class QueryTaskDto extends QueryDto {}
