/* eslint-disable @typescript-eslint/no-explicit-any */
import { Provider } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { InputOptions } from '../types';

export const FORM_FIELD_APPEARANCE_TOKEN = 'FORM_FIELD_APPEARANCE_TOKEN';

export function provideFormFieldAppearance(
  appearance: MatFormField['appearance']
): Provider {
  return {
    provide: FORM_FIELD_APPEARANCE_TOKEN,
    useValue: appearance,
  };
}

/**
 * Inject list of FormFields
 */
export const FORM_FIELDS_TOKEN = 'FORM_FIELDS_TOKEN';

export type SelectItemOptions = {
  value: any;
  label?: string;
};
export type InputType =
  | 'checkbox'
  | 'date'
  | 'date-range'
  | 'date-time'
  | 'number'
  | 'radio'
  | 'select'
  | 'slider'
  | 'switch'
  | 'text'
  | 'textarea';

export type FormField = {
  name: string;
  icon?: string;
  label?: string;
  enums?: string[];
  options?: InputOptions[];
  multiple?: boolean;
  component?: any;
  /**
   * If input will be selected from a resource like categories, what is the resource name token?
   * Provided resource service should impement getInputOptions():{label: string value:any}
   */
  resourceNameToken?: string;
};

export function provideFormFields(fields: FormField[]): Provider {
  return {
    provide: FORM_FIELDS_TOKEN,
    useValue: fields,
  };
}

export function provideFormGroup(
  record: Record<string, string | number | Date | boolean>
): Provider {
  return {
    provide: FormGroup,
    useValue: new FormBuilder().group(record),
  };
}
