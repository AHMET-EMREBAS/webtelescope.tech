import { Dto, Property } from '@webpackages/core';
import { IUpdateTaskDto } from '@webpackages/common';
@Dto()
export class UpdateTaskDto implements IUpdateTaskDto {
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
    enums: { 0: 'hard', 1: 'medium', 2: 'easy' },
    inputType: 'select',
    icon: 'select',
  })
  difficulty?: string;
  @Property({ type: 'date' }) due?: date;
  @Property({ type: 'date', label: 'Start date', icon: 'date' })
  startDate?: date;
  @Property({ type: 'date', label: 'Start date', icon: 'date' }) endDate?: date;
  @Property({ type: 'object', objectType: IDDto }) assignees?: IDDto;
  @Property({ type: 'object', objectType: IDDto }) createdBy?: IDDto;
  @Property({ type: 'object', objectType: IDDto }) sprint?: IDDto;
}
