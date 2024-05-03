import { ComponentRef, Directive } from '@angular/core';
import { IInputComponent } from './input-component';

/**
 * Define all the input properties here and extend this component from the input component
 * Use the @ContentChidlren decorator to inject input components marked with this directive.
 *
 */
@Directive({
  selector: '[wtInput]',
  standalone: true,
})
export class InputDirective {
  constructor(public componentRef: ComponentRef<IInputComponent>) {}
}
