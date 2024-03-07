export type InputType =
  | 'text'
  | 'number'
  | 'textarea'
  | 'checkbox'
  | 'select'
  | 'radio'
  | 'autocomplete'
  | 'switch'
  | 'slider'
  | 'range'
  | 'button';

export type PropertyType = 'Text' | 'Number' | 'Date' | 'Boolean' | 'Record';
export type RelationType = 'One' | 'Many' | 'Owner';
export type StringFormat = 'email' | 'password' | 'phone';

export type CommonPropertyDefinition<T extends PropertyType> = {
  type: T;
  icon?: string;
  label?: string;
  inputType?: InputType;
  required?: true;
  unique?: true;
};

export type StringPropertyDefinition = CommonPropertyDefinition<'Text'> & {
  format?: StringFormat;
};
export type NumberPropertyDefinition = CommonPropertyDefinition<'Number'>;
export type BooleanPropertyDefinition = CommonPropertyDefinition<'Boolean'>;
export type DatePropertyDefinition = CommonPropertyDefinition<'Date'>;
export type RecordPropertyDefinition = CommonPropertyDefinition<'Record'>;

export type RelationDefinition = {
  target: string;
  type: RelationType;
};

export type PropertyDefinition =
  | StringPropertyDefinition
  | NumberPropertyDefinition
  | BooleanPropertyDefinition
  | DatePropertyDefinition
  | RecordPropertyDefinition
  | RelationDefinition;

export type ModelDefinition = {
  properties: Record<string, PropertyDefinition>;
};
