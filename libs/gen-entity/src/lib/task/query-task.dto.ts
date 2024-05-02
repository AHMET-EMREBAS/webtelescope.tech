import { Dto, Property, IDDto } from '@webpackages/core';
import { IQueryTaskDto } from '@webpackages/gen-model';
@Dto()
export class QueryTaskDto implements IQueryTaskDto {
  @Property({}) title?: string;
  @Property({}) description?: string;
  @Property({}) difficulty?: string;
  @Property({}) due?: Date;
  @Property({}) startDate?: Date;
  @Property({}) endDate?: Date;
  @Property({ type: 'string' }) userUsername?: string;
  @Property({ type: 'string' }) sprintName?: string;
}
