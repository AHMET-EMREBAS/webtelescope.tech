import {
  BooleanProperty,
  DateProperty,
  NumberProperty,
  StringProperty,
} from '../meta';

type PartialPick<T, P extends keyof T> = Partial<Pick<T, P>>;

export type CommonStringPick = PartialPick<
  StringProperty,
  'required' | 'unique' | 'defaultValue' | 'description'
>;

export function ShortString(value?: CommonStringPick): Partial<StringProperty> {
  const { defaultValue, required, unique } = value ?? {};
  return {
    type: 'string',
    minLength: 0,
    maxLength: 30,
    searchable: true,
    defaultValue,
    required,
    unique,
  };
}

export function LongString(value?: CommonStringPick): Partial<StringProperty> {
  const { defaultValue, required, unique } = value ?? {};
  return {
    type: 'string',
    minLength: 0,
    maxLength: 400,
    searchable: true,
    defaultValue,
    required,
    unique,
  };
}

export function DescriptionProperty(description?: string) {
  return LongString({ description });
}

export function UniqueNameProperty(
  description?: string
): Partial<StringProperty> {
  return ShortString({ unique: true, required: true, description });
}

export function PositiveNumberProperty(): Partial<NumberProperty> {
  return { type: 'number', minimum: 0, searchable: true };
}

export function DefaultBooleanProperty(): Partial<BooleanProperty> {
  return { type: 'boolean', searchable: true, defaultValue: false };
}

export function DateOfBirthProperty(): Partial<DateProperty> {
  return {
    type: 'date',
    searchable: true,
  };
}
