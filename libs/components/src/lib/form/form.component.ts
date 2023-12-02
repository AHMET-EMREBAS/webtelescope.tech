/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Subscription, firstValueFrom, map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

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
export class FormComponent implements OnDestroy, AfterViewInit {
  errorMessageSubscriber!: Subscription;
  successAddSubscriber!: Subscription;

  submitted = false;

  @Output() submitFormEvent = new EventEmitter();

  @Input() submitLabel = 'Submit';

  @Input() formGroup: FormGroup =
    inject(FormGroup, { optional: true }) ||
    new FormGroup({ name: new FormControl('') });

  @Input() updateForm?: boolean = false;
  @Input() itemId?: string | null;

  constructor(
    @Optional()
    @Inject(ResourceService)
    private readonly service: ResourceService<any>,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  submit() {
    this.submitted = true;
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      if (this.updateForm === true) {
        if (this.service) {
          this.service.updateItem({ id: this.itemId, ...this.formGroup.value });
        }
        this.submitFormEvent.emit(this.formGroup.value);
      } else {
        if (this.service) {
          this.service.saveItem(this.formGroup.value);
        }
        this.submitFormEvent.emit(this.formGroup.value);
      }
    }
  }

  reset() {
    this.submitted = false;
    this.formGroup.reset();
  }

  async ngAfterViewInit() {
    if (this.updateForm === true) {
      if (this.itemId) {
        const oldFormValue = await firstValueFrom(
          this.service.getByKey(this.itemId)
        );

        Object.entries(this.formGroup.controls).forEach(([key, control]) => {
          control.setValue(oldFormValue[key]);
        });
      }
    }

    this.errorMessageSubscriber = this.service?.errorMessages$
      .pipe(
        map((errors) => {
          if (errors) {
            console.log('Update check .......... ', errors);
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

    this.successAddSubscriber = this.service?.entityActions$.subscribe((e) => {
      if (e.type.endsWith('/add-one/success')) {
        this.router.navigate(['../'], { relativeTo: this.route });
      }
      console.log(e.type);
      if (e.type.endsWith('/update-one/success')) {
        this.router.navigate(['../../'], { relativeTo: this.route });
      }
    });
  }

  ngOnDestroy(): void {
    this.errorMessageSubscriber.unsubscribe();
    this.successAddSubscriber.unsubscribe();
  }
}
