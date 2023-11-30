import { ClassConstructor } from 'class-transformer';
import { GoogleIcons, InputType, PropertyType, StringFormat } from './common';

export class CommonValidtionMeta<TPropertyType extends PropertyType> {
  type!: TPropertyType;
  isArray?: boolean;
  required?: boolean;
}

export class StringValidationMeta extends CommonValidtionMeta<'string'> {
  minLength?: number;
  maxLength?: number;
  format?: StringFormat;
  isIn?: string[];
}

export class NumberValidationMeta extends CommonValidtionMeta<'number'> {
  min?: number;
  max?: number;
  isInt?: boolean;
}
export class BooleanValidationMeta extends CommonValidtionMeta<'boolean'> {}

export class DateValidationMeta extends CommonValidtionMeta<'date'> {}

export class ObjectValidationMeta extends CommonValidtionMeta<'object'> {
  target!: ClassConstructor<unknown>;
}

export class UserInterfaceMeta {
  inputType!: InputType;
  icon!: GoogleIcons;
  label!: string;
  hint?: string;
}

export type StringPropertyMeta = StringValidationMeta & UserInterfaceMeta;

export type NumberPropertyMeta = NumberValidationMeta & UserInterfaceMeta;

export type DatePropertyMeta = DateValidationMeta & UserInterfaceMeta;

export type ObjectPropertyMeta = ObjectValidationMeta & UserInterfaceMeta;

export type BooleanPropertyMeta = BooleanValidationMeta & UserInterfaceMeta;

export type PropertyValidationMeta =
  | StringValidationMeta
  | NumberValidationMeta
  | BooleanValidationMeta
  | ObjectValidationMeta
  | DateValidationMeta;

export type PropertyMeta =
  | StringPropertyMeta
  | NumberPropertyMeta
  | BooleanPropertyMeta
  | DatePropertyMeta
  | ObjectPropertyMeta;
