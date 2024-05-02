import { Dto, Property, IDDto } from '@webpackages/core';
import { IQueryTaskDto } from '@webpackages/gen-model';
@Dto()
export class QueryTaskDto implements IQueryTaskDto {
  @Property({
    type: 'string',
    minLength: 3,
    maxLength: 100,
    inputType: 'text',
    icon: 'task',
  })
  title?: string;
  @Property({
    type: 'string',
    maxLength: 1000,
    inputType: 'textarea',
    icon: 'description',
  })
  description?: string;
  @Property({
    type: 'string',
    enums: ['hard', 'medium', 'easy'],
    inputType: 'select',
    icon: 'select',
  })
  difficulty?: string;
  @Property({ type: 'date' }) due?: Date;
  @Property({ type: 'date', label: 'Start date', icon: 'date' })
  startDate?: Date;
  @Property({ type: 'date', label: 'Start date', icon: 'date' }) endDate?: Date;
  @Property({ type: 'string' }) userUsername?: string;
  @Property({ type: 'string' }) sprintName?: string;
}
