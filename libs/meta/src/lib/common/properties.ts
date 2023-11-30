import { PropertyMeta } from '../meta';

export function UniqueNameProperty(): PropertyMeta {
  return {
    name: 'name',
    label: 'Name',
    type: 'string',
    icon: 'info',
    inputType: 'text-input',
    minLength: 3,
    maxLength: 50,
    required: true,
    unique: true,
  };
}

export function DescriptionProperty(): PropertyMeta {
  return {
    name: 'description',
    label: 'Description',
    type: 'string',
    icon: 'description',
    inputType: 'textarea',
    maxLength: 400,
  };
}

export function CurrencyProperty(name: string): PropertyMeta {
  return {
    name,
    label: name,
    icon: 'attach_money',
    inputType: 'text-input',
    type: 'number',
    min: 0,
  };
}

export function QuantityProperty(name: string): PropertyMeta {
  return {
    name,
    type: 'number',
    label: name,
    min: 0,
    icon: 'numbers',
    inputType: 'text-input',
  };
}
