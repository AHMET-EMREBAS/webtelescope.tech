import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import { Observable, debounceTime, map } from 'rxjs';

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

@Component({ template: '' })
export class BaseFieldComponent implements OnInit {
  /**
   * Input referance
   */
  @ViewChild('input') inputRef!: MatInput;

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
  @Input() prefixIcon?: string;
  /**
   * Suffix icon
   */
  @Input() suffixIcon?: string;

  /**
   * Field hint
   */
  @Input() hint?: string;

  /**
   * @ignore
   */
  errors$!: Observable<string[]>;

  constructor(public readonly formGroup: FormGroup) {}

  ngOnInit(): void {
    const control = this.formGroup.get(this.inputName);

    if (control) {
      this.errors$ = control.valueChanges.pipe(
        debounceTime(400),
        map(() => {
          console.log(control.errors);
          return Object.values(control.errors || {}).shift();
        })
      );
    } else {
      console.error(`Controller ${this.inputName} not found!`);
    }
  }

  focus() {
    this.inputRef.focus();
  }
}
