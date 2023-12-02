import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { DateComponent } from '../date/date.component';
import { DateTimeComponent } from '../date-time/date-time.component';
import { EditorComponent } from '../editor/editor.component';
import { RadioComponent } from '../radio/radio.component';
import { SelectComponent } from '../select/select.component';
import { SwitchComponent } from '../switch/switch.component';
import { TextInputComponent } from '../text-input/text-input.component';
import { TextareaInputComponent } from '../textarea-input/textarea-input.component';
import { CommonInputComponent } from '../common-input.component';
import { ChiplistComponent } from '../chiplist/chiplist.component';

@Component({
  selector: 'wt-form-input',
  standalone: true,
  imports: [
    CommonModule,
    AutocompleteComponent,
    CheckboxComponent,
    DateComponent,
    DateTimeComponent,
    EditorComponent,
    RadioComponent,
    SelectComponent,
    SwitchComponent,
    TextInputComponent,
    TextareaInputComponent,
    ChiplistComponent
  ],
  templateUrl: './form-input.component.html',
  styleUrl: './form-input.component.scss',
})
export class FormInputComponent extends CommonInputComponent {
  @Input() componentType:
    | 'text-input'
    | 'autocomplete'
    | 'chiplist'
    | 'checkbox'
    | 'date'
    | 'date-time'
    | 'editor'
    | 'radio'
    | 'select'
    | 'switch'
    | 'text-input'
    | 'textarea-input' = 'text-input';
}
