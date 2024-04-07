import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceElementsFactory,
  EntityDataModuleConfig,
} from '@ngrx/data';
import { EntityCollectionService } from '../common';
import { HttpClient } from '@angular/common/http';
import {
  IID,
  IMeeting,
  IProject,
  ISprint,
  ITag,
  ITask,
} from '@webpackages/model';

export const ProjectEntityDataModuleConfig: EntityDataModuleConfig = {
  pluralNames: {
    Project: 'Projects',
    Sprint: 'Sprints',
    Task: 'Tasks',
    Tag: 'Tags',
    Meeting: 'Meetings',
  },
  entityMetadata: {
    Project: {},
    Sprint: {},
    Task: {},
    Tag: {},
    Meeting: {},
  },
};

@Injectable()
export class ProjectService extends EntityCollectionService<IProject> {
  constructor(f: EntityCollectionServiceElementsFactory, h: HttpClient) {
    super('Project', f, h);
  }
}
@Injectable()
export class SprintService extends EntityCollectionService<ISprint<IID>> {
  constructor(f: EntityCollectionServiceElementsFactory, h: HttpClient) {
    super('Sprint', f, h);
  }
}
@Injectable()
export class TaskService extends EntityCollectionService<
  ITask<IID, IID, IID, IID>
> {
  constructor(f: EntityCollectionServiceElementsFactory, h: HttpClient) {
    super('Task', f, h);
  }
}
@Injectable()
export class TagService extends EntityCollectionService<ITag> {
  constructor(f: EntityCollectionServiceElementsFactory, h: HttpClient) {
    super('Tag', f, h);
  }
}
@Injectable()
export class MeetingService extends EntityCollectionService<
  IMeeting<IID, IID>
> {
  constructor(f: EntityCollectionServiceElementsFactory, h: HttpClient) {
    super('Meeting', f, h);
  }
}
