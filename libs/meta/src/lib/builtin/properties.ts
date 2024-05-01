import { PropertyOptions } from '../common-imp';

export function UniqueNameProperty(): PropertyOptions {
  return {
    type: 'string',
    minLength: 3,
    maxLength: 30,
    unique: true,
    required: true,
  };
}

export function DescriptionProperty(): PropertyOptions {
  return {
    type: 'string',
    maxLength: 600,
  };
}

export function RequiredPositiveNumberProperty(): PropertyOptions {
  return {
    type: 'number',
    minimum: 0,
  };
}

export function NumberProperty(): PropertyOptions {
  return {
    type: 'number',
  };
}
