import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EntityCollectionService } from '@webpackages/ngrx';
import { IID } from '@webpackages/model';
import { BehaviorSubject } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: '',
})
export class BaseFormComponent<T extends IID> {
  submitted$ = new BehaviorSubject(false);

  constructor(
    public readonly formGroup: FormGroup,
    public readonly service: EntityCollectionService<T>
  ) {}

  submit() {
    this.submitted$.next(true);
    this.service.add(this.formGroup.value);
  }

  reset() {
    this.submitted$.next(false);
    this.formGroup.reset();
    this.formGroup.enable({ emitEvent: true });
  }
}
