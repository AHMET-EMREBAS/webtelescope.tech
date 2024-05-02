import { NgrxCollectionService } from '../base';
import { ITask, ITaskView } from '@webpackages/gen-model';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Injectable } from '@angular/core';

@Injectable()
export class TaskService extends NgrxCollectionService<ITask> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('Task', factory);
  }
}

@Injectable()
export class TaskViewService extends NgrxCollectionService<ITaskView> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('TaskView', factory);
  }
}
