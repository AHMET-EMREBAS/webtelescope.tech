export type CommonProperty = {
  isArray?: boolean;
};

export type UIType = {
  label?: string;
  hint?: string;
  inputType?: string;
  prefixIcon?: string;
  suffixIcon?: string;
  prefixText?: string;
  suffixText?: string;
};

export type StringProperty = {
  type: 'string';
  format?: string;
  minLength?: number;
  maxLength?: number;
};

export type BooleanProperty = {
  type: 'boolean';
};

export type NumberProperty = {
  type: 'number' | 'integer';
  min?: number;
  max?: number;
};

export type DateProperty = {
  type: 'date';
};

export type DatetimeProperty = {
  type: 'datetime';
};

export type ObjectProperty = {
  type: 'object';
  target: string;
};

export type Property = {
  ui: UIType;
  validation:
    | StringProperty
    | BooleanProperty
    | NumberProperty
    | DateProperty
    | ObjectProperty
    | DatetimeProperty;
};

export type RelationProperty = {
  type: 'One' | 'Many' | 'Owner';
  target: string;
};
