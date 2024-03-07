export type PropertyDefination = {
  type: 'Text' | 'Number' | 'Date' | 'Boolean' | 'Record';
  icon?: string;
  label?: string;
  inputType?:
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
  required?: true;
  unique?: true;
  format?: string;
};

export type RelationDefination = {
  target: string;
  type: 'One' | 'Many' | 'Owner';
};

export type ModelDefination = {
  properties: Record<string, PropertyDefination | RelationDefination>;
};
