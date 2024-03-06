export class CommonValidation {
  isArray?: boolean;
}

export class StringValidation extends CommonValidation {
  minLength?: number;
  maxLength?: number;
  format?: string;
  enum?: string[];
}
export class NumberValidation extends CommonValidation {
  min?: number;
  max?: number;
  isInt?: boolean;
}

export class DateValidation extends CommonValidation {}

export class BooleanValidation extends CommonValidation {}

export class ObjectValidation extends CommonValidation {}

export class CommonPropertyOptions<V> {
  icon?: string;
  label?: string;
  inputType?: string;
  validation: V;
}

export class StringPropertyOptions extends CommonPropertyOptions<StringValidation> {}
export class NumberPropertyOptions extends CommonPropertyOptions<NumberValidation> {}
export class DatePropertyOptions extends CommonPropertyOptions<DateValidation> {}
export class BooleanPropertyOptions extends CommonPropertyOptions<BooleanValidation> {}
export class ObjectPropertyOptions extends CommonPropertyOptions<ObjectValidation> {}

export type PropertyOptions =
  | StringPropertyOptions
  | NumberPropertyOptions
  | DatePropertyOptions
  | BooleanPropertyOptions
  | ObjectPropertyOptions;

export class RelationOptions {
  type: string;
  target: string;
  icon: string;
  label?: string;
}

export class ModelOptions {
  properties?: Record<string, PropertyOptions>;
  relations?: Record<string, RelationOptions>;
  unique?: string[];
  required?: string[];
}
