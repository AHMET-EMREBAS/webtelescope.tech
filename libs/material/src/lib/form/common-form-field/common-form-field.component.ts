import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Icon, InputErrors, InputType } from '../../api';
import { BehaviorSubject, Observable, debounceTime, map } from 'rxjs';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'wt-common-form-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './common-form-field.component.html',
  styleUrl: './common-form-field.component.scss',
})
export class CommonFormFieldComponent implements OnInit {
  @ViewChild('input') inputRef!: MatInput;
  /**
   * Form Controller
   */
  @Input() name = 'name';

  /**
   * Input type
   */
  @Input() type: InputType = 'text';

  /**
   * Input label
   */
  @Input() label: string = '';

  /**
   * Default value
   */
  @Input() defaultValue: unknown | null = null;

  /**
   * Requried field
   */
  @Input() required: boolean = false;

  /**
   * Input placeholder
   */
  @Input() placeholder: string | null = null;

  /**
   * Prefix icon
   */
  @Input() prefixIcon?: Icon;

  /**
   * Suffix icon
   */
  @Input() suffixIcon?: Icon;

  /**
   * Input hints
   */
  @Input() hints?: string;

  /**
   * Validate minLength
   */
  @Input() minLength: number = 1;

  /**
   * Validate maxLength
   */
  @Input() maxLength: number = 100;

  /**
   * Validate min
   */
  @Input() min: number = Number.MIN_SAFE_INTEGER;

  /**
   * Validate max
   */
  @Input() max: number = Number.MAX_SAFE_INTEGER;

  errors$ = new BehaviorSubject<InputErrors | null>(null);

  iconColor$ = new BehaviorSubject<'primary' | 'warn'>('primary');

  inputStatus$?: Observable<unknown>;

  formControl!: AbstractControl;

  showValidationDetails = false;

  constructor(public readonly formGroup: FormGroup) {}

  ngOnInit(): void {
    {
      const control = this.formGroup.get(this.name);
      if (!control) throw new Error(`${this.name} is not in the FormGroup`);
      this.formControl = control;
    }

    this.inputStatus$ = this.formControl.valueChanges.pipe(
      debounceTime(200),
      map(() => {
        const s = this.formControl.status;

        if (s === 'INVALID') {
          this.errors$.next(this.formControl.errors);
          this.iconColor$.next('warn');
        } else {
          this.errors$.next(null);
          this.iconColor$.next('primary');
        }
        this.formControl.enable();
      })
    );
  }

  focus() {
    this.inputRef.focus();
  }

  length() {
    return this.formControl.value.length;
  }
}
