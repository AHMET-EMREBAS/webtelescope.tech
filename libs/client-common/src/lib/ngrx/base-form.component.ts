import { Component, Input } from '@angular/core';
import { IID } from '@webpackages/common';
import { NgrxCollectionService } from './ngrx-collection-service';
import { InputOption } from './input-option';

@Component({ template: '' })
export class BaseFormComponent<T extends IID> {
  @Input() inputs!: InputOption[];

  constructor(protected readonly service: NgrxCollectionService<T>) {}
}
