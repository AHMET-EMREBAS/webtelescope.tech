import { PropertyTypes } from '../common';
import { PropertyOptions } from '../common-imp';

export type CommonPropertyOptions = Pick<
  PropertyOptions,
  | 'required'
  | 'unique'
  | 'description'
  | 'format'
  | 'autocomplete'
  | 'inputType'
  | 'icon'
  | 'label'
>;

export function ShortTextProperty(
  options?: CommonPropertyOptions
): PropertyOptions {
  return {
    type: PropertyTypes.STRING,
    minLength: 3,
    maxLength: 100,
    inputType: 'text',
    ...options,
  };
}

export function LongTextProperty(
  options?: CommonPropertyOptions
): PropertyOptions {
  return {
    type: PropertyTypes.STRING,
    maxLength: 1000,
    inputType: 'textarea',
    ...options,
  };
}

export function EnumProperty(
  options: Pick<PropertyOptions, 'enums'> &
    Pick<PropertyOptions, 'required' | 'icon' | 'label'>
): PropertyOptions {
  return {
    type: PropertyTypes.STRING,
    inputType: 'select',
    icon: 'select',
    ...options,
  };
}

export function UniqueNameProperty(
  options?: Pick<
    PropertyOptions,
    'icon' | 'inputType' | 'autocomplete' | 'label'
  >
): PropertyOptions {
  return ShortTextProperty({
    unique: true,
    required: true,
    description: 'Required unique short text',
    ...options,
  });
}

export function UserNameProperty(): PropertyOptions {
  return ShortTextProperty({
    format: 'email',
    required: true,
    unique: true,
  });
}
export function PasswordProperty(): PropertyOptions {
  return ShortTextProperty({ format: 'password', required: true });
}

export function BarcodeProperty(): PropertyOptions {
  return {
    type: PropertyTypes.STRING,
    minLength: 10,
    maxLength: 13,
    required: true,
    unique: true,
    inputType: 'text',
    icon: 'barcode',
  };
}

export function DescriptionProperty(): PropertyOptions {
  return LongTextProperty({ inputType: 'textarea', icon: 'description' });
}

export function NumberProperty(
  options?: CommonPropertyOptions
): PropertyOptions {
  return {
    type: PropertyTypes.NUMBER,
    ...options,
  };
}

export function PositiveNumberProperty(
  options?: CommonPropertyOptions
): PropertyOptions {
  return {
    type: 'number',
    minimum: 0,
    ...options,
  };
}

export function CurrencyProperty(
  options: Pick<PropertyOptions, 'required' | 'icon' | 'label'>
): PropertyOptions {
  return {
    type: PropertyTypes.NUMBER,
    minimum: 0,
    icon: 'currency',
    inputType: 'currency',
    ...options,
  };
}

export type CommonObjectProperties = Partial<
  Pick<PropertyOptions, 'objectType' | 'isArray' | 'icon' | 'inputType'>
>;

export function ObjectProperty(
  options?: CommonObjectProperties
): PropertyOptions {
  return {
    type: PropertyTypes.OBJECT,
    inputType: 'select',
    ...options,
  };
}

export function IDProperty(
  options: Pick<CommonObjectProperties, 'isArray' | 'icon' | 'inputType'>
): PropertyOptions {
  return ObjectProperty({
    objectType: 'IDDto',
    inputType: 'select',
    icon: 'id',
    ...options,
  });
}

export function BooleanProperty(
  options?: Pick<PropertyOptions, 'icon' | 'inputType' | 'description'>
): PropertyOptions {
  return {
    type: PropertyTypes.BOOLEAN,
    inputType: 'slide-toggle',
    ...options,
  };
}

export function DateProperty(
  options?: Pick<PropertyOptions, 'required' | 'description' | 'label' | 'icon'>
): PropertyOptions {
  return {
    type: PropertyTypes.DATE,
    ...options,
  };
}
