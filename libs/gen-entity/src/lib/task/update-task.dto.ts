import { Dto, Property, IDDto } from '@webpackages/core';
import { IUpdateTaskDto } from '@webpackages/gen-model';
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
    enums: ['hard', 'medium', 'easy'],
    inputType: 'select',
    icon: 'select',
  })
  difficulty?: string;
  @Property({ type: 'date' }) due?: Date;
  @Property({ type: 'date', label: 'Start date', icon: 'date' })
  startDate?: Date;
  @Property({ type: 'date', label: 'Start date', icon: 'date' }) endDate?: Date;
  @Property({ type: 'object', objectType: IDDto }) user?: IDDto;
  @Property({ type: 'object', objectType: IDDto }) sprint?: IDDto;
}
