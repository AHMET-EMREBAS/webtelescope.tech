import { NgrxCollectionService } from '../base';
import { IProject, IProjectView } from '@webpackages/gen-model';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Injectable } from '@angular/core';

@Injectable()
export class ProjectService extends NgrxCollectionService<IProject> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('Project', factory);
  }
}

@Injectable()
export class ProjectViewService extends NgrxCollectionService<IProjectView> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('ProjectView', factory);
  }
}
