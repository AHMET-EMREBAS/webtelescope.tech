/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import { Observable, debounceTime, map, startWith } from 'rxjs';

@NgModule({
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class CommonFieldModule {}

export class ErrorState implements ErrorStateMatcher {
  isErrorState(control: AbstractControl | null): boolean {
    return control?.dirty && control.invalid ? true : false;
  }
}

@Component({ template: '' })
export class BaseFieldComponent<T = any, InputRef = MatInput>
  implements OnInit
{
  readonly errorState = new ErrorState();

  /**
   * Emits the input value when the update button is clicked.
   */
  @Output() updateEvent = new EventEmitter<T>();
  /**
   * Input referance
   */
  @ViewChild('input') inputRef!: InputRef;

  /**
   * FormControl name
   */
  @Input() inputName!: string;

  /**
   * Input type
   */
  @Input() inputType = 'text';

  /**
   * Is field requried?
   */
  @Input() required = false;
  /**
   * Label
   */
  @Input() label?: string;

  /**
   * Prefix icon
   */
  @Input() prefixIcon = 'info';
  /**
   * Suffix icon
   */
  @Input() suffixIcon?: string;

  /**
   * Field hint
   */
  @Input() hint?: string;

  /**
   * Is update form field
   */
  @Input() isUpdateField = false;

  /**
   * @ignore
   */
  errors$!: Observable<string[]>;

  iconColor$!: Observable<'primary' | 'accent' | 'warn'>;

  constructor(public readonly formGroup: FormGroup) {}

  ngOnInit(): void {
    const control = this.formGroup.get(this.inputName);

    if (control) {
      this.errors$ = control.valueChanges.pipe(
        startWith(''),
        debounceTime(400),
        map(() => {
          if (control.touched && control.dirty) {
            return Object.values(control.errors || {}).shift();
          }
          return null;
        })
      );

      this.iconColor$ = this.errors$.pipe(
        map((e) => {
          if (control.touched) {
            if (e) {
              return 'warn';
            }
          }
          return 'primary';
        })
      );
    } else {
      console.error(`Controller ${this.inputName} not found!`);
    }
  }

  focus() {
    if ((this.inputRef as any)?.focus) {
      (this.inputRef as any).focus();
    }
  }

  updateField() {
    const control = this.formGroup.get(this.inputName);
    control?.markAllAsTouched();
    control?.markAsDirty();
    this.updateEvent.emit(control?.value);
  }
}
