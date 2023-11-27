import { Component, Inject, Input, Optional } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({ template: '' })
export class CommonInputComponent {
  /**
   * Upon form submit update the error message
   */
  @Input() errorMessage = 'Invalid input';

  /**
   * Input label
   */
  @Input() label = 'Input Label';

  /**
   * FormControlName
   */
  @Input() name = 'name';

  /**
   * Input icon
   */
  @Input() icon = 'info';

  @Input() iconColor = 'primary';

  /**
   * Explain the constraints of input value
   */
  @Input() hint = '';

  /**
   * Select Options
   */
  @Input() options: string[] = ['First', 'Second', 'Third'];

  @Input() multiple = false;

  

  constructor(
    @Optional() @Inject(FormGroup) public readonly formGroup: FormGroup
  ) {
    if (!formGroup) {
      this.formGroup = new FormGroup({ [this.name]: new FormControl('') });
    }
  }

  control() {
    return this.formGroup.get(this.name);
  }
  isInvalid() {
    return this.control()?.invalid && this.control()?.touched;
  }

  getError() {
    return this.control()?.getError('error');
  }

  getIconColor() {
    return this.control()?.invalid && this.control()?.touched
      ? 'red'
      : this.iconColor;
  }
}
