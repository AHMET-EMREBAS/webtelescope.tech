import { Component, Input } from '@angular/core';
import { IID } from '@webpackages/common';
import { NgrxCollectionService } from './ngrx-collection-service';
import { InputOptions } from '@webpackages/meta';

@Component({ template: '' })
export class BaseFormComponent<T extends IID> {
  @Input() inputs!: InputOptions[];

  constructor(protected readonly service: NgrxCollectionService<T>) {}
}
