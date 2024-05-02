import {
  DateProperty,
  EnumProperty,
  LongTextProperty,
  Model,
  OneRelation,
  ShortTextProperty,
} from '@webpackages/meta';
import { UserModel } from '../user';
import { SprintModel } from './sprint';

export const TaskModel: Model = {
  modelName: 'Task',
  properties: {
    title: ShortTextProperty({ required: true, icon: 'task' }),
    description: LongTextProperty({ icon: 'description' }),
    difficulty: EnumProperty({ enums: ['hard', 'medium', 'easy'] }),
    due: DateProperty(),
    startDate: DateProperty({ label: 'Start date', icon: 'date' }),
    endDate: DateProperty({ label: 'Start date', icon: 'date' }),
  },
  relations: {
    user: OneRelation(UserModel),
    sprint: OneRelation(SprintModel),
  },
};
