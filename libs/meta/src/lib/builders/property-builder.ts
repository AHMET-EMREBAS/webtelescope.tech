import { StringProperty } from '../meta';

type PartialPick<T, P extends keyof T> = Partial<Pick<T, P>>;

export type CommonStringPick = PartialPick<
  StringProperty,
  'required' | 'unique' | 'defaultValue' | 'description'
>;

export function ShortString({
  defaultValue,
  required,
  unique,
}: CommonStringPick): Partial<StringProperty> {
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

export function LongString({
  defaultValue,
  required,
  unique,
}: CommonStringPick): Partial<StringProperty> {
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
