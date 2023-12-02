import {
  AfterViewInit,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  Optional,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ResourceService } from '../api';
import { map } from 'rxjs';

@Component({
  selector: 'wt-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnDestroy {
  errorMessageSubscriber = this.service?.errorMessages$
    .pipe(
      map((errors) => {
        if (errors) {
          for (const error of errors) {
            const constraints = Object.entries(error.constraints)
              .map(([key, value]) => {
                return { ['_' + key]: value };
              })
              .reduce((p, c) => ({ ...p, ...c }));
            this.formGroup.get(error.property)?.setErrors(constraints);
          }
        }
      })
    )
    .subscribe();

  submitted = false;
  @Output() submitFormEvent = new EventEmitter();

  @Input() submitLabel = 'Submit';

  @Input() formGroup: FormGroup =
    inject(FormGroup, { optional: true }) ||
    new FormGroup({ name: new FormControl('') });

  constructor(
    @Optional()
    @Inject(ResourceService)
    private readonly service: ResourceService<any>
  ) {}

  submit() {
    this.submitted = true;
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      if (this.service) {
        this.service.saveItem(this.formGroup.value);
      }
      this.submitFormEvent.emit(this.formGroup.value);
    }
  }

  reset() {
    this.submitted = false;
    this.formGroup.reset();
  }

  ngOnDestroy(): void {
    this.errorMessageSubscriber.unsubscribe();
  }
}
